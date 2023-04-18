const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));


// Route 1: GET /top_movies
// In the homepage, show fixed top 10 movies
// Notes: merged_genre_rating is already sorted by avg_rate in descending order
const top_movies = async function(req, res) {
  connection.query(`
  SELECT DISTINCT movie_id, title, year_of_release, isAdult, runtimeMinutes, avg_rate, GROUP_CONCAT(DISTINCT genre SEPARATOR ',') AS genres
    FROM merged_genre_rating
    GROUP BY movie_id
    ORDER BY avg_rate DESC
    LIMIT 10;
  `, (err, data) => {
    if (err || data.length === 0) {
      // console.log('top_movies: 123')
      console.log(err);
      res.json({});
    } else {
      // console.log('top_movies: 456')
      res.json(data);
    }
  });
};


// Route 2: GET /movie_page
// In the movie page, show movies in pages. Each page has 10 movies
// Notes: each movie has several genres so I didn't show genres in this page
const movie_page = async function(req, res) {

  connection.query(`
  SELECT DISTINCT movie_id, title, year_of_release, isAdult, runtimeMinutes, avg_rate, GROUP_CONCAT(DISTINCT genre SEPARATOR ',') AS genres
  FROM merged_genre_rating
  GROUP BY movie_id;`, (err, data) => {
  if (err || data.length === 0) {
    console.log(err);
    res.json({});
    } else {
      res.json(data);
    }
  })
};

// Route 3: GET /movie_page/:movie_id
// Selct movie by movie_id (may be used to pop up movie card)
// Notes: each movie has several genres and genre can be retreived by res.json(data[1]['genre'])
const movie = async function(req, res) {
  const movie_id = req.params.movie_id;
  console.log('movie_id: ', movie_id);

  connection.query(`
    SELECT movie_id, title, year_of_release, isAdult, runtimeMinutes, genre, avg_rate
    FROM merged_genre_rating
    WHERE movie_id = '${movie_id}'`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
      // res.json(data[0]['genre']);
      // res.json(data[1]['genre']);
      // res.json(data[2]['genre']);
    }
  });
};

// Route 4: GET /movie_id_distribution/:movie_id
// show one movie's rating distribution
// pop up in the movie card (plot) ??? combined with route 3 ???
const movie_rating_distribution = async function(req, res) {
  const movie_id = req.params.movie_id;

  connection.query(`
    SELECT rating, count
    FROM rating_distribution
    WHERE movie_id = '${movie_id}';
    `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 5: GET /genre_defeat/:movie_id
// movie defeat percentage on each genre
const movie_defeat = async function(req, res) {
  const movie_id = req.params.movie_id;
  console.log('movie_id: ', movie_id);

  connection.query(`
    WITH genre_rating AS (
        SELECT genre, avg_rate
        FROM merged_genre_rating
        WHERE movie_id = '${movie_id}'
        ),
    high_rate_count_genre AS (
        SELECT gr.genre, COUNT(*) count
        FROM genre_rating gr JOIN merged_genre_rating mgr ON gr.genre = mgr.genre
        WHERE mgr.avg_rate < gr.avg_rate
        GROUP BY gr.genre
        ),
    total_count_genre AS (
        SELECT gr.genre, COUNT(*) count
        FROM genre_rating gr JOIN merged_genre_rating mgr ON gr.genre = mgr.genre
        GROUP BY gr.genre
        )
    SELECT h.genre, h.count lower_rate_count, t.count total_count, h.count/t.count defeat_perc
    FROM high_rate_count_genre h JOIN total_count_genre t ON h.genre = t.genre;
   `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 6: GET /filter_movies
// In movie page, filter movies by title, release year, runtime, genre, isAdult
const filter_movies = async function(req, res) {
  const title = req.query.title ?? '';
  const ReleaseYearLow = req.query.releaseyear_low ?? 1914;
  const ReleaseYearHigh = req.query.releaseyear_high ?? 2005;
  const runtimeLow = req.query.runtime_low ?? 0;
  const runtimeHigh = req.query.runtime_high ?? 1335;
  const isAdult = req.query.isAdult === 'true' ? 1 : 0;

  let genreCondition = '';
  if (req.query.genre) {
    genreCondition = `genre = '${req.query.genre}' AND`;
  }

  connection.query(`
    SELECT movie_id, title, year_of_release, isAdult, runtimeMinutes, genre, avg_rate
    FROM merged_genre_rating
    WHERE ${genreCondition}
      primaryTitle LIKE '%${title}%' AND
      year_of_release BETWEEN ${ReleaseYearLow} AND ${ReleaseYearHigh} AND
      runtimeMinutes BETWEEN ${runtimeLow} AND ${runtimeHigh} AND
      isAdult <= ${isAdult}
      `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  })
};


// Statistics -- pop up window
// Route 7: GET /top_genres/:rate_bar
// show top 5 genres with count and average rating after filtering by each movie's avg_rating (e.g. 4)
const count_top_genres = async function(req, res) {
  const rate_bar = req.params.rate_bar;
  console.log('rate_bar: ', rate_bar);

  connection.query(`
    SELECT genre, COUNT(*) as genre_count, AVG(avg_rate) as averate_rating
    FROM merged_genre_rating
    WHERE avg_rate >= ${rate_bar}
    GROUP BY genre
    LIMIT 5;
    `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
};

// Route 8: GET /genre_rating_change/:genre?
// plot time series on chosen genre (By default, show all genres' avg_rate time series)
const genre_rating_change = async function(req, res) {
  let genreCondition = '';
  if (req.params.genre) {
    genreCondition = `WHERE genre = '${req.params.genre}'`;
  }
  console.log('genreCondition: ', genreCondition);

  connection.query(`
    SELECT year_of_release, AVG(avg_rate) as average_rating
    FROM merged_genre_rating
    ${genreCondition}
    GROUP BY year_of_release
    `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 9: GET /genre_runtime_change/:genre?
// plot time series on chosen genre (By default, show all genres' runtime time series)
const genre_runtime_change = async function(req, res) {
  let genreCondition = '';
  if (req.params.genre) {
    genreCondition = `WHERE genre = '${req.params.genre}'`;
  }
  console.log('genreCondition: ', genreCondition);

  connection.query(`
    SELECT year_of_release, AVG(runtimeMinutes) as average_runtime
    FROM merged_genre_rating
    ${genreCondition}
    GROUP BY year_of_release
    `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 10: GET /movie_after/:year
// complex query: select movies after 2000 (default) so that it has a high movie rating and low runtime
const select_movies = async function(req, res) {
  let year = 2000;
  if (req.params.year) {
    year = req.params.year;
  }
  console.log('year: ', year);

  connection.query(`
    WITH max_rating_before AS (
          SELECT MAX(avg_rate) as max_avg_rating
          FROM merged_genre_rating
          WHERE year_of_release < ${year}
    ),
    min_runtime_before AS (
        SELECT MIN(runtimeMinutes) as min_runtime
        FROM merged_genre_rating
        WHERE year_of_release < ${year} AND avg_rate = (SELECT max_avg_rating FROM max_rating_before)
    )
    SELECT movie_id, title, year_of_release, runtimeMinutes, avg_rate as average_rating
    FROM merged_genre_rating
    WHERE year_of_release >= ${year}
        AND avg_rate >= (SELECT max_avg_rating FROM max_rating_before)
        AND runtimeMinutes >= (SELECT min_runtime FROM min_runtime_before);
    `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

// Route 11: GET /top_cast
// In the homepage, show fixed top 10 cast by the number of movies
const top_cast = async function(req, res) {
    connection.query(`
        SELECT person.primaryName, COUNT(*) AS movie_count
        FROM movie_principals
        JOIN person ON movie_principals.nconst = person.nconst
        WHERE movie_principals.category = 'actor' OR movie_principals.category = 'actress'
        GROUP BY person.nconst
        ORDER BY movie_count DESC
        LIMIT 10;`, (err, data) => {
            if (err || data.length === 0) {
            console.log(err);
            res.json({});
            } else {
            res.json(data);
            }
        });
    };

// Route 12: GET /top_cast_rating
// In the homepage, show fixed top 10 cast by the average rating
const top_cast_rating = async function(req, res) {
    connection.query(`
        SELECT p.primaryName, r.avg_rate
        FROM merged_genre_rating r
        JOIN movie_principals mp ON r.tconst = mp.tconst
        JOIN person p ON p.nconst = mp.nconst
        WHERE category = 'actor' OR category = 'actress'
        GROUP BY p.nconst
        ORDER BY r.avg_rate DESC
        LIMIT 10;`, (err, data) => {
        if (err || data.length === 0) {
        console.log(err);
        res.json({});
        } else {
        res.json(data);
        }
    });
    };


// Route 13: GET /cast_page
// In the cast page, show cast in pages. Each page has 10 cast
const cast_page = async function(req, res) {

    connection.query(`
        SELECT p.primaryName, r.avg_rate
        FROM merged_genre_rating r
        JOIN movie_principals mp ON r.tconst = mp.tconst
        JOIN person p ON p.nconst = mp.nconst
        WHERE category = 'actor' OR category = 'actress'
        GROUP BY p.nconst`, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data);
        }
    })
  };


// Route 14: GET /cast_page/:nconst
// Select cast by nconst (may be used to pop up cast card)
const cast = async function(req, res) {
    const nconst = req.params.nconst;
    console.log('nconst: ', nconst);

    connection.query(`
        SELECT p.primaryName, r.avg_rate
        FROM merged_genre_rating r
        JOIN movie_principals mp ON r.tconst = mp.tconst
        JOIN person p ON p.nconst = mp.nconst
        WHERE category = 'actor' OR category = 'actress'
        GROUP BY p.nconst
        WHERE person.nconst = '${nconst}'`, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data);
        }
    });
  };

// Route 15: GET /cast_filter
// Filter cast by the number of movies, whether it is adult, release year, and genre
const cast_filter = async function(req, res) {
    const numMovie = req.query.num_movie ?? 0;
    const avgRate = req.query.avg_rate ?? 0;
    const isAdult = req.query.isAdult === 'true' ? 1 : 0;
    const releaseYearLow = req.query.release_year_low ?? 1900;
    const releaseYearHigh = req.query.release_year_high ?? 2023;

    let genreCondition = '';
    if (req.query.genre) {
      genreCondition = `r.genre = '${req.query.genre}'`;
    }

    connection.query(`
        SELECT p.primaryName, avg_rate, COUNT(DISTINCT r.tconst) AS num_movie
        FROM merged_genre_rating r
        JOIN movie_principals mp ON r.tconst = mp.tconst
        JOIN person p ON p.nconst = mp.nconst
        WHERE (mp.category = 'actor' OR mp.category = 'actress') AND ${genreCondition} AND r.isAdult <= ${isAdult} AND r.year_of_release <= ${releaseYearHigh} AND r.year_of_release >= ${releaseYearLow}
        GROUP BY p.nconst
        HAVING num_movie >= ${numMovie} AND avg_rate >= ${avgRate}
        `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    })
  };


// Route 16: GET /top_writer
// In the cast page, it shows top writers by the average rating in page
const top_writer = async function(req, res) {

    connection.query(`
        SELECT p.primaryName AS writer_name, avg_rate, COUNT(DISTINCT r.tconst) AS num_movie
        FROM writer w
        JOIN merged_genre_rating r ON w.tconst = r.tconst
        JOIN person p on w.nconst = p.nconst
        GROUP BY p.nconst
        `, (err, data) => {
            if (err || data.length === 0) {
            console.log(err);
            res.json({});
            } else {
            res.json(data);
            }
        });
    };


// Route 17: GET /writer_filter
// Filter writer by the number of movies, whether it is adult, release year, and genre
const writer_filter = async function(req, res) {
    const numMovie = req.query.num_movie ?? 0;
    const avgRate = req.query.avg_rate ?? 0;
    const isAdult = req.query.isAdult === 'true' ? 1 : 0;
    const releaseYearLow = req.query.release_year_low ?? 1900;
    const releaseYearHigh = req.query.release_year_high ?? 2023;

    let genreCondition = '';
    if (req.query.genre) {
      genreCondition = `r.genre = '${req.query.genre}'`;
    }

    connection.query(`
        SELECT p.primaryName AS writer_name, avg_rate, COUNT(DISTINCT r.tconst) AS num_movie
        FROM writer w
        JOIN merged_genre_rating r ON w.tconst = r.tconst
        JOIN person p on w.nconst = p.nconst
        WHERE ${genreCondition} AND r.isAdult <= ${isAdult} AND r.year_of_release <= ${releaseYearHigh} AND r.year_of_release >= ${releaseYearLow}
        GROUP BY p.nconst
        HAVING num_movie >= ${numMovie} AND avg_rate >= ${avgRate}
        `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    })
  };


// Route 18: GET /top_director
// In the cast page, it shows top directors by the average rating
const top_director = async function(req, res) {

    connection.query(`
        SELECT p.primaryName AS director_name, avg_rate, COUNT(DISTINCT r.tconst) AS num_movie
        FROM director w
        JOIN merged_genre_rating r ON w.tconst = r.tconst
        JOIN person p on w.nconst = p.nconst
        GROUP BY p.nconst
        `, (err, data) => {
            if (err || data.length === 0) {
            console.log(err);
            res.json({});
            } else {
            res.json(data);
            }
        });
    };

// Route 19: GET /director_filter
// Filter director by the number of movies, whether it is adult, release year, and genre
const director_filter = async function(req, res) {
    const numMovie = req.query.num_movie ?? 0;
    const avgRate = req.query.avg_rate ?? 0;
    const isAdult = req.query.isAdult === 'true' ? 1 : 0;
    const releaseYearLow = req.query.release_year_low ?? 1900;
    const releaseYearHigh = req.query.release_year_high ?? 2023;

    let genreCondition = '';
    if (req.query.genre) {
      genreCondition = `r.genre = '${req.query.genre}'`;
    }

    connection.query(`
        SELECT p.primaryName AS director_name, avg_rate, COUNT(DISTINCT r.tconst) AS num_movie
        FROM director w
        JOIN merged_genre_rating r ON w.tconst = r.tconst
        JOIN person p on w.nconst = p.nconst
        WHERE ${genreCondition} AND r.isAdult <= ${isAdult} AND r.year_of_release <= ${releaseYearHigh} AND r.year_of_release >= ${releaseYearLow}
        GROUP BY p.nconst
        HAVING num_movie >= ${numMovie} AND avg_rate >= ${avgRate}
        `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    })
  };


module.exports = {
  top_movies,
  movie_page,
  movie,
  filter_movies,
  count_top_genres,
  genre_rating_change,
  genre_runtime_change,
  movie_rating_distribution,
  select_movies,
  movie_defeat,
  top_cast,
  top_cast_rating,
  cast_page,
  cast,
  cast_filter,
  top_writer,
  writer_filter,
  top_director,
  director_filter
}
