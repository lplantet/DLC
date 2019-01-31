const mysql = require('mysql');
const fs = require('fs');

main();

async function main() {
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
  let moviesAdded = 0;

  // Insert movies into the database
  console.log('Inserting movies...');
  const promisesForMovies = [];
  movies.forEach(movie => {
    promisesForMovies.push(new Promise((resolve, reject) => {
      connection.query(`INSERT INTO movies (id, title, duration, rating, poster) VALUES (?, ?, ?, ?, ?);`,
        [movie.id, movie.title, movie.duration, movie.rating, movie.poster],
        (error, results) => {
          if (!error) {
            moviesAdded++;
            resolve();
          } else {
            reject(movie);
          }
        }
      );
    }));
  });

  await Promise.all(promisesForMovies);

  // Insert genres into the database
  console.log('Inserting genres...');
  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      connection.query(`INSERT INTO genres (movieID, genre) VALUES (?, ?);`,
        [movie.id, genre]
    );
    })
  });

  console.log('Closing connection...');
  connection.end();

  console.log(`\n${moviesAdded} movies added to the database`);
}
