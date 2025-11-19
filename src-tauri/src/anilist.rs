use keyring::Entry;
use url::{ form_urlencoded, Url };
use tauri::{ AppHandle, Emitter };
use tauri_plugin_opener::OpenerExt;
use reqwest::header::{ AUTHORIZATION, CONTENT_TYPE };
use serde::{ Deserialize, Serialize };
use tauri_plugin_http::reqwest;
use serde_json::json;

#[cfg(debug_assertions)]
const IS_DEV: bool = false;

#[cfg(not(debug_assertions))]
const IS_DEV: bool = false;

#[tauri::command]
pub fn anilist_start_login(app: AppHandle) -> Result<(), String> {
	let (url, log_label) = if IS_DEV {
		let client_id = "32272";
		(
			format!("https://anilist.co/api/v2/oauth/authorize?client_id={}&response_type=token", client_id),
			"dev implicit",
		)
	} else {
		let client_id = "32273";
		(
			format!("https://anilist.co/api/v2/oauth/authorize?client_id={}&response_type=token", client_id),
			"prod implicit",
		)
	};

	println!("[RUST] opening AniList {} flow", log_label);

	app
		.opener()
		.open_url(url, None::<&str>)
		.map_err(|e| e.to_string())?;

	Ok(())
}

#[tauri::command]
pub fn get_anilist_login_status() -> Result<bool, String> {
	load_token()
		.map(|token| token.is_some())
		.map_err(|e| e.to_string())
}

#[tauri::command]
pub fn clear_anilist_access_token(app: AppHandle) -> Result<(), String> {
	delete_token()
		.map_err(|e| e.to_string())
		.and_then(|_| app.emit("auth-changed", ()).map_err(|e| e.to_string()))
}

#[tauri::command]
pub fn set_anilist_access_token(
	app: AppHandle,
	token: String
) -> Result<(), String> {
	save_token(&token)
		.map_err(|e| e.to_string())
		.and_then(|_| app.emit("auth-changed", ()).map_err(|e| e.to_string()))
}

pub fn handle_deep_link(app: &AppHandle, url: &Url) -> Result<(), String> {
	println!("[RUST] handle_deep_link called with: {url}");

	if url.scheme() != "animare" {
		return Ok(());
	}

	let host = url
		.host_str()
		.ok_or_else(|| "missing host on animare://auth".to_string())?;

	if host != "auth" {
		return Ok(());
	}

	let fragment = url
		.fragment()
		.ok_or_else(|| "missing fragment on animare://auth".to_string())?;

	let token = form_urlencoded
		::parse(fragment.as_bytes())
		.find(|(k, _)| k == "access_token")
		.map(|(_, v)| v.into_owned())
		.ok_or_else(|| "missing 'access_token' in auth fragment".to_string())?;

	println!("[RUST] received AniList token via deeplink");

	save_token(&token).map_err(|e| e.to_string())?;
	app.emit("auth-changed", ()).map_err(|e| e.to_string())?;

	Ok(())
}

fn save_token(token: &str) -> anyhow::Result<()> {
	let entry = Entry::new("animare", "anilist_access_token")?;
	entry.set_password(token)?;
	Ok(())
}

fn load_token() -> anyhow::Result<Option<String>> {
	let entry = Entry::new("animare", "anilist_access_token")?;
	Ok(
		entry
			.get_password()
			.ok()
			.and_then(|token| {
				if token.trim().is_empty() { None } else { Some(token) }
			})
	)
}

fn delete_token() -> anyhow::Result<()> {
	let entry = Entry::new("animare", "anilist_access_token")?;
	entry.set_password("")?;
	Ok(())
}

#[derive(Deserialize, Serialize, Clone)]
pub struct AniListViewer {
	pub id: i32,
	pub name: String,
	pub avatar: Avatar,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Avatar {
	pub large: String,
}

#[derive(Deserialize)]
struct GraphQLData {
	#[serde(rename = "Viewer")]
	pub viewer: Option<AniListViewer>,
}

#[derive(Deserialize)]
struct GraphQLResponse {
	pub data: GraphQLData,
}

#[tauri::command]
pub async fn get_anilist_viewer() -> Result<AniListViewer, String> {
	let token = load_token()
		.map_err(|e| e.to_string())?
		.ok_or_else(|| "No access token found".to_string())?;

	let client = reqwest::Client::new();
	let query =
		json!({"query": "query { Viewer { id name avatar { large } } }"});
	let res = client
		.post("https://graphql.anilist.co")
		.header(AUTHORIZATION, format!("Bearer {}", token))
		.header(CONTENT_TYPE, "application/json")
		.json(&query)
		.send().await
		.map_err(|e| e.to_string())?;

	if !res.status().is_success() {
		return Err(format!("GraphQL request failed: {}", res.status()));
	}

	let resp: GraphQLResponse = res.json().await.map_err(|e| e.to_string())?;
	let viewer = resp.data.viewer.ok_or_else(||
		"Viewer data not found in response".to_string()
	)?;

	Ok(viewer)
}
