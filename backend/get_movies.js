const request = require('request-promise-native');
const fs = require('fs');

const API_KEY = 'dc8b2182ad3d36a38cfd96904a3a7cfb';
const API_ENDPOINT = 'https://api.themoviedb.org/3';

const main = async () => {
  const movies = [];

  // For each year
  for (let year = 2000; year < 2019; year++) {
    console.log(`Loading movies from ${year}...`);

    // For each page of results
    for (let page = 1; page < 11; page++) {
      const res = JSON.parse(await request.get(`${API_ENDPOINT}/discover/movie?api_key=${API_KEY}&year=${year}&sort_by=popularity.desc&page=${page}`));

      res.results.forEach(movie => {
        movies.push({
          'title': movie.title,
          'duration': 0,
          'genre': movie.genre_ids.join(),
          'rating': movie.vote_average,
        });
      });
    }
  }

  // Write movies in a file
  fs.writeFileSync(__dirname + '/movies.json', JSON.stringify(movies), 'utf8');
  console.log(`${movies.length} movies saved`);
}

main();
