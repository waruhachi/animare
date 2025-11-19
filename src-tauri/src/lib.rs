use tauri_plugin_updater::UpdaterExt;
use tauri_plugin_deep_link::DeepLinkExt;

mod anilist;

use anilist::{
	anilist_start_login,
	clear_anilist_access_token,
	get_anilist_login_status,
	handle_deep_link,
	get_anilist_viewer,
	set_anilist_access_token,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder
		::default()
		.plugin(
			tauri_plugin_single_instance::init(|app, args, cwd| {
				println!(
					"[RUST] <lib.rs> (tauri_plugin_single_instance): {app:?}, {args:?}, {cwd:?}"
				);
			})
		)
		.plugin(tauri_plugin_store::Builder::default().build())
		.plugin(tauri_plugin_updater::Builder::new().build())
		.plugin(tauri_plugin_deep_link::init())
		.plugin(tauri_plugin_opener::init())
		.plugin(tauri_plugin_http::init())
		.invoke_handler(
			tauri::generate_handler![
				anilist_start_login,
				get_anilist_login_status,
				set_anilist_access_token,
				clear_anilist_access_token,
				get_anilist_viewer
			]
		)
		.setup(|app| {
			#[cfg(any(windows, target_os = "linux"))]
			{
				app.deep_link().register_all()?;
			}

			if let Some(urls) = app.deep_link().get_current()? {
				println!("[RUST] startup deep link URLs: {:?}", urls);

				let handle = app.handle().clone();
				for url in urls {
					if let Err(e) = handle_deep_link(&handle, &url) {
						eprintln!(
							"[RUST] failed to handle startup deep link: {e}"
						);
					}
				}
			}

			let handle = app.handle().clone();
			app.deep_link().on_open_url(move |event| {
				let urls = event.urls();

				println!("[RUST] deep link events URLs: {:?}", urls);

				for url in urls {
					if let Err(e) = handle_deep_link(&handle, &url) {
						eprintln!("[RUST] failed to handle deep link: {e}");
					}
				}
			});

			let handle = app.handle().clone();
			tauri::async_runtime::spawn(async move {
				if let Err(e) = update(handle).await {
					eprintln!("[RUST] updater failed: {e}");
				}
			});

			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
	if let Some(update) = app.updater()?.check().await? {
		let mut downloaded = 0;

		update.download_and_install(
			|chunk_length, content_length| {
				downloaded += chunk_length;
				println!("downloaded {downloaded} from {content_length:?}");
			},
			|| {
				println!("update finished");
			}
		).await?;

		println!("update installed");
		app.restart();
	}

	Ok(())
}
