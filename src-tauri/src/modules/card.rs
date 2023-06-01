use mysql::serde_json;
use serde::{Serialize, Deserialize};
use serde_json::{Result as JsonResult};

use crate::config::db::DbConnection;

#[derive(Serialize, Deserialize, Debug)]
struct CardById {
    id: i32,
    cpf: String
}

pub fn get_by_id(card: &str) -> JsonResult<String> {
    let mut conn = DbConnection::new().unwrap();
    let query = format!("CALL car_card_getById('{}')", card);

    let result: Vec<CardById> = match conn.execute_procedure(query.as_str()) {
        Ok(rows) => {
            rows.into_iter().map(|row| {
                //let (id, cpf) = mysql::from_row(row.unwrap());
                let id= row.get("id").unwrap();
                let cpf= row.get("cpf").unwrap();
                CardById { id, cpf }
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