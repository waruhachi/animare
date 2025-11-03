use tauri_plugin_updater::UpdaterExt;
use tauri_plugin_deep_link::DeepLinkExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
	format!("Hello, {}! You've been greeted from Rust!", name)
}

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
		.plugin(tauri_plugin_updater::Builder::new().build())
		.plugin(tauri_plugin_deep_link::init())
		.plugin(tauri_plugin_opener::init())
		.invoke_handler(tauri::generate_handler![greet])
		.setup(|app| {
			// Make sure deep links are registered for windows and linux
			#[cfg(any(windows, target_os = "linux"))]
			{
				app.deep_link().register_all()?;
			}

			// Note that get_current's return value will also get updated every time on_open_url gets triggered.
			let start_urls = app.deep_link().get_current()?;
			if let Some(urls) = start_urls {
				// app was likely started by a deep link
				println!("deep link URLs: {:?}", urls);
			}

			app.deep_link().on_open_url(|event| {
				println!("deep link events URLs: {:?}", event.urls());
			});

			// Automatically check for updates on app startup
			let handle = app.handle().clone();
			tauri::async_runtime::spawn(async move {
				update(handle).await.unwrap();
			});

			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
	if let Some(update) = app.updater()?.check().await? {
		let mut downloaded = 0;

		// alternatively we could also call update.download() and update.install() separately
		update.download_and_install(
			|chunk_length, content_length| {
				downloaded += chunk_length;
				println!("downloaded {downloaded} from {content_length:?}");
			},
			|| {
				println!("download finished");
			}
		).await?;

		println!("update installed");
		app.restart();
	}

	Ok(())
}
