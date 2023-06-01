use mysql::*;
use mysql::prelude::*;

pub struct DbConnection {
    pool: Pool,
}

impl DbConnection {
    //noinspection RsTypeCheck
    pub fn new() -> Result<Self, Error> {

        let _opts = Opts::from(OptsBuilder::new()
            .user(Some("administrator"))
            .pass(Some("9%8@DzjJAo2f"))
            .ip_or_hostname(Some("10.200.2.200"))
            .db_name(Some("playcardsys"))
            .tcp_port(3306)
        );

        let pool = Pool::new(_opts)?;
        Ok(DbConnection { pool })
    }

    pub fn execute_procedure(&mut self, _query: &str) -> Result<Vec<Row>, Error> {
        let mut conn = self.pool.get_conn().expect("Failed to obtain connection from the pool.");
        let result:Vec<Row> = conn.query_map(_query,|row| row)?;

        Ok(result)
    }
}