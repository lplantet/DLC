const mysql = require('mysql');
const fs = require('fs');

main();

async function main() {
  // Load movies from local file
  let movies = JSON.parse(fs.readFileSync(__dirname + '/movies.json', 'utf8'));

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
  const failedMovies = [];
  const promisesForMovies = [];
  movies.forEach(movie => {
    promisesForMovies.push(new Promise((resolve, reject) => {
      connection.query(`INSERT INTO movies (id, title, duration, rating, poster) VALUES (?, ?, ?, ?, ?);`,
        [movie.id, movie.title, movie.duration, movie.rating, movie.poster],
        (error, results) => {
          if (!error) {
            moviesAdded++;
            if ((moviesAdded % 100) == 0) console.log(`${moviesAdded}...`);
            resolve();
          } else {
            console.log(`Error inserting: ${movie.title}`);
            failedMovies.push(movie.title);
            reject(movie);
          }
        }
      );
    }));
  });

  await Promise.all(promisesForMovies.map(promise => promise.catch(error => error)))
  console.log(`\n${moviesAdded} movies added to the database`);

  // Clear movies that were not added
  movies = movies.filter(movie => !failedMovies.includes(movie.title));

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
}
