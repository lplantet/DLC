const mysql = require('mysql');

exports.Database = class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'dlc'
    });

    this.connection.connect();
  }

  search(film) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM movies WHERE title LIKE ?', [film], (error, results) => {
        if (error) reject(error);
        console.log('OSKUUUUUUUUUUUUUUUUUUR', results);
        resolve(results);
      });
    })
  }
}

// TODO
//connection.end();