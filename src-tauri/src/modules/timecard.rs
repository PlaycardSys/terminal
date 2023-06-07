use mysql::serde::{Serialize, Deserialize};
use mysql::serde_json;
use mysql::serde_json::{Result as JsonResult};

use crate::config::db::DbConnection;


#[derive(Debug, Serialize, Deserialize)]
struct TimecardById {
    card_id: String,
    is_started: bool,
    time: i32,
    started_at: String,
    ended_at: String,
}

pub fn get_by_id(card: &str) -> JsonResult<String> {
    let mut conn = DbConnection::new().unwrap();
    let query = format!("CALL car_timecard_getById('{}')", card);

    let result: Vec<TimecardById> = match conn.execute_procedure(query.as_str()) {
        Ok(rows) => {
            rows.into_iter().map(|row| {

                let card_id= row.get("card_id").unwrap();
                let is_started= row.get("is_started").unwrap();
                let time = row.get("time").unwrap();
                let started_at = row.get("started_at").unwrap();
                let ended_at = row.get("ended_at").unwrap();

                TimecardById {
                    card_id, is_started, time, started_at, ended_at
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