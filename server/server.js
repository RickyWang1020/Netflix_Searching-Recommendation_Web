const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js

// routes for movies part
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/top_movies', routes.top_movies);
app.get('/movie_page', routes.movie_page);
app.get('/movie_page/:movie_id', routes.movie);
app.get('/movie_id_distribution/:movie_id', routes.movie_rating_distribution);
app.get('/genre_defeat/:movie_id', routes.movie_defeat);
app.get('/filter_movies', routes.filter_movies);
app.get('/top_genres/:rate_bar', routes.count_top_genres);
app.get('/genre_rating_change/:genre?', routes.genre_rating_change);
app.get('/genre_runtime_change/:genre?', routes.genre_runtime_change);
app.get('/movie_after/:year?', routes.select_movies);

//routes for cast part
app.get('/top_cast', routes.top_cast);
app.get('/top_cast_rating', routes.top_cast_rating)
app.get('/cast_page', routes.cast_page)
app.get('/cast_page/:nconst', routes.cast)
app.get('/cast_filter', routes.cast_filter)
app.get('/top_writer', routes.top_writer)
app.get('/writer_filter', routes.writer_filter)
app.get('/top_director', routes.top_director)
app.get('/director_filter', routes.director_filter)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
