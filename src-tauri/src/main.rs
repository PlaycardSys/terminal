// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use commands::card_get_by_id;
use commands::timecard_get_by_id;
use commands::event_get_by_id;

fn main() {
    tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![
                card_get_by_id,
                timecard_get_by_id,
                event_get_by_id
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
}
