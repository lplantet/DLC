const request = require('request-promise-native');
const fs = require('fs');

const API_KEY = 'dc8b2182ad3d36a38cfd96904a3a7cfb';
const API_ENDPOINT = 'https://api.themoviedb.org/3';

main();

async function main() {
  // Load movies from themoviedb API
  const movies = await getMovies();

  // Fetch images base url from API and update paths in movies
  const posterBaseURL = await getPosterBaseURL();
  movies.forEach(movie => movie.poster = posterBaseURL + movie.poster);

  // Fetch movie genres and update them in movies
  const movieGenres = await getMovieGenres();
  movies.forEach(movie => movie.genres = movie.genres.map(genre => movieGenres[genre]));
  
  // Write movies in a file
  fs.writeFileSync(__dirname + '/movies.json', JSON.stringify(movies), 'utf8');
  console.log(`${movies.length} movies saved`);
}

async function getMovies() {
  movies = [];
  
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
          'genres': movie.genre_ids,
          'rating': movie.vote_average,
          'poster': movie.poster_path
        });
      });
    }
  }

  return movies;
}

async function getPosterBaseURL() {
  // Load images config from API
  const config = JSON.parse(await request.get(`${API_ENDPOINT}/configuration?api_key=${API_KEY}`));
  
  return `${config.images.base_url}original`;
}

async function getMovieGenres() {
  // Load genres ids from API
  const res = JSON.parse(await request.get(`${API_ENDPOINT}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`));
  
  // Format results to be more usable
  const genres = {};
  res.genres.forEach(genre => genres[genre.id] = genre.name);
  
  return genres;
}
