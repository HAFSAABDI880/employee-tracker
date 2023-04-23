const mysql = require("mysql2");

class Db {
  constructor(dbOptions) {
    this.dbOptions = dbOptions;
    this.connection = mysql.createConnection(dbOptions);
  }

  
  stop() {
    this.connection.end();
    console.log(
      `Successfully disconnected from ${this.dbOptions.database} database`
    );
  }

  query(sqlQuery) {
    return new Promise((resolve, reject) => {
      this.connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(`[ERROR]: ${err.message}`);
          return reject(err.message);
        }

        resolve(result);
      });
    });
  }
}

module.exports = Db;
