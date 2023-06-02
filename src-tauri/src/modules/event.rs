use mysql::serde::{Serialize, Deserialize};
use mysql::serde_json;
use mysql::serde_json::{Result as JsonResult};

use crate::config::db::DbConnection;

#[derive(Debug, Serialize, Deserialize)]
struct EventsById {
    created_at: String,
    card_id: i32,
    class: String,
    event: String,
    amount: String,
}

pub fn get_by_id(card: &str) -> JsonResult<String> {
    let mut conn = DbConnection::new().unwrap();
    let query = format!("CALL car_card_events_getById('{}')", card);

    let result: Vec<EventsById> = match conn.execute_procedure(query.as_str()) {
        Ok(rows) => {
            rows.into_iter().map(|row| {

                let created_at= row.get("created_at").unwrap();
                let card_id= row.get("card_id").unwrap();
                let class = row.get("class").unwrap();
                let event = row.get("event").unwrap();
                let amount = row.get("amount").unwrap();

                EventsById {
                    created_at, card_id, class, event, amount
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