use tauri::command;

use terminal::modules::card;
use terminal::modules::timecard;
use terminal::modules::event;

#[command]
pub fn card_get_by_id(card: &str) -> String {
    let json_string = card::get_by_id(card).unwrap();
    format!("{}", json_string)
}

#[command]
pub fn timecard_get_by_id(card: &str) -> String {
    let json_string = timecard::get_by_id(card).unwrap();
    format!("{}", json_string)
}

#[command]
pub fn event_get_by_id(card: &str) -> String {
    let json_string = event::get_by_id(card).unwrap();
    format!("{}", json_string)
}