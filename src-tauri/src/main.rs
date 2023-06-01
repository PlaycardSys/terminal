// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use terminal::modules::card;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn card_get_by_id(card: &str) -> String {
    let json_string = card::get_by_id(card).unwrap();
    format!("{}", json_string)
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, card_get_by_id])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
