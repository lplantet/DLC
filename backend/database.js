const mysql = require('mysql');

exports.Database = class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: '???',
      password: '???',
      database: '???'
    });

    this.connection.connect();
  }

  search(film) {
    this.connection.query('SELECT 1 + 1 AS test', (error, results) => {
      if (error) throw error;
      return results[0].test;
    });
  }
}

// TODO
//connection.end();