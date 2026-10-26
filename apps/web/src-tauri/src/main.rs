#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  menu::{Menu, MenuItemBuilder, SubmenuBuilder},
  Emitter,
};
use tauri_plugin_deep_link::DeepLinkExt;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_deep_link::init())
    .setup(|app| {
      let settings = MenuItemBuilder::new("Settings…")
        .id("settings")
        .accelerator("CmdOrCtrl+,")
        .build(app)?;

      let app_menu = SubmenuBuilder::new(app, "Muṣarrif")
        .about(None)
        .separator()
        .item(&settings)
        .separator()
        .services()
        .separator()
        .hide()
        .hide_others()
        .show_all()
        .separator()
        .quit()
        .build()?;

      let menu = Menu::new(app)?;
      menu.append(&app_menu)?;
      app.set_menu(menu)?;

      let handle = app.handle().clone();
      app.deep_link().on_open_url(move |event| {
        open_musarrif_urls(&handle, event.urls());
      });

      open_musarrif_urls(app.handle(), app.deep_link().get_current().unwrap_or_default().unwrap_or_default());

      Ok(())
    })
    .on_menu_event(|app, event| {
      if event.id() == "settings" {
        app.emit("open-settings", ()).ok();
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application")
}

fn open_musarrif_urls(app: &tauri::AppHandle, urls: Vec<url::Url>) {
  for url in urls {
    if let Ok(path) = url.to_file_path() {
      if path.extension().map(|e| e == "musarrif").unwrap_or(false) {
        if let Ok(content) = std::fs::read_to_string(&path) {
          app.emit("import-user-data", content).ok();
        }
      }
    }
  }
}
