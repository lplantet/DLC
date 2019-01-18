const mysql = require('mysql');
const fs = require('fs');

// Load movies from local file
const movies = JSON.parse(fs.readFileSync(__dirname + '/movies.json', 'utf8'));

console.log('Connecting to mysql...');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'dlc'
});

connection.connect();

// Insert movies into the database
console.log('Inserting movies...');
movies.forEach(movie => {
  connection.query(`INSERT INTO movies (title, duration, rating, poster) VALUES (?, ?, ?, ?);`,
    [movie.title, movie.duration, movie.rating, movie.poster]
  );
});

// Insert genres into the database
console.log('Inserting genres...');
movies.forEach(movie => {
  movie.genres.forEach(genre => {
    connection.query(`INSERT INTO genres (title, genre) VALUES (?, ?);`,
      [movie.title, genre]
  );
  })
});

console.log('Closing connection...');
connection.end();

console.log(`\n${movies.length} movies added to the database`);
