const express = require('express');
const cors = require('cors');
const { Database } = require('./database.js');

const app = express();
const database = new Database();

app.use(cors());

app.get('/search', (req, res) => {
  const film = req.query.film;
  
  if (!film) {
    res.status(400).end();
    return;
  }

  const data = database.search(film);
  
  res.status(200).send(data);
});

app.listen(3000);
console.log('Server ON');
