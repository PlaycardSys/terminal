use mysql::serde::{Serialize, Deserialize};
use mysql::serde_json;
use mysql::serde_json::{Result as JsonResult};

use crate::config::db::DbConnection;


#[derive(Debug, Serialize, Deserialize)]
struct CardById {
    card_id: String,
    cpf: Option<String>,
    alias: Option<String>,
    type_card: i32,
    credits: String,
    bonus: String,
    credpromo: String,
    tickets: i32,
    vip: bool,
    last_change: Option<String>,
    last_hit: Option<String>,
    price: String,
    blocked_reason: Option<String>,
    sold_at: Option<String>,
    blocked_at: Option<String>,
}

pub fn get_by_id(card: &str) -> JsonResult<String> {
    let mut conn = DbConnection::new().unwrap();
    let query = format!("CALL car_card_getById('{}')", card);

    let result: Vec<CardById> = match conn.execute_procedure(query.as_str()) {
        Ok(rows) => {
            rows.into_iter().map(|row| {

                let card_id = row.get("card_id").unwrap();
                let cpf= row.get("cpf");
                let alias= row.get("alias").unwrap_or_else(|| Some("".to_string()));
                let type_card= row.get("type").unwrap();
                let credits= row.get("credits").unwrap();
                let bonus= row.get("bonus").unwrap();
                let credpromo= row.get("credpromo").unwrap();
                let tickets= row.get("tickets").unwrap();
                let vip= row.get("vip").unwrap();
                let last_change = row.get("last_change").unwrap_or_else(|| Some("".to_string()));
                let last_hit = row.get("last_hit").unwrap_or_else(|| Some("".to_string()));
                let price= row.get("price").unwrap();
                let blocked_reason= row.get("blocked_reason").unwrap_or_else(|| Some("".to_string()));
                let sold_at= row.get("sold_at").unwrap_or_else(|| Some("".to_string()));
                let blocked_at = row.get("blocked_at").unwrap_or_else(|| Some("".to_string()));

                CardById {
                    card_id, cpf, alias, type_card, credits, bonus, credpromo, tickets,
                    vip, last_change, last_hit, price, blocked_reason, sold_at, blocked_at
                }
            }).collect()
        }
        Err(err) => {
            eprintln!("Error executing the stored procedure: {}", err);
            Vec::new()
        }
    };

    let json_result: JsonResult<String> = serde_json::to_string(&result);

    json_result
}