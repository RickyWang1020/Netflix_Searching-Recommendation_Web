# Netflix Searching and Recommendation Web System

## About
This is the Final Project for Databases and Information Systems, a webpage for users to search information and statistics about Netflix Movies and/or TV series, as well as casts and crews.

Main contributors:

- Backend: Liancheng Gong, Jinyun Shan
- Frontend: Zhaoze Wang, Xinran Wang
- Project TA: Jason Hom

## How to Use

- Run `npm install` in both the `./client` and `./server` folders, to download dependencies
- Run `npm start` in `./client` to start the frontend server, run `npm start` in `./server` to start the backend server
- The frontend server is running on `http://localhost:3000`, the backend server is running on `http://localhost:8080`

## Major Features

- `Preprocess.ipynb` is the Jupyter Notebook for data preprocessing

- Home Page
  - Recommended movies are shown as rolling posters
  - Interactive statistics display for "Top 5 Genres with Most High-Rated Movies", "Movie Average Rating Over Time by Genre", and "Movie Average Runtime Over Time by Genre"
  - Tabular display of top movies/series, top casts, top directors and top writers, based on the highest average ratings

- Movie Page
  - Can filter on the range of release year, range of runtime, whether or not the movie is adult-only, and the genre
  - Support ascending and descending sort on `release year`, `runtime` and `average rating` fields

- Cast and Crew Page
  - 3 types of searches, respectively for finding cast (actor/actress), writer, and director
  - For casts, can filter on the sex, range of birth year, range of average rating, and number of movies acted
  - For writers and directors, can filter on the range of birth year, range of average rating, number of movies written/directed, and the specific genre of their work
  - Support ascending and descending sort on `birth year`, `death year`, `number of movies/series` and `average rating` fields

## Video Demo

[YouTube Link](https://youtu.be/_Wl4nhkr4nI)

## Datasets for this Project
1. [Netflix Prize Data](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data?select=README): It includes two files: combined_data.txt and movie_titles.csv. The combined_data.txt file contains information on movie ratings, including the movie ID, customer ID, rating, and date. The movie_titles.csv file contains information on the movie ID, year of release, and title.

2. [IMDB Dataset](https://www.imdb.com/interfaces/): It is a large dataset that contains the reviews, cast information, crews, genres, and ratings of over 50,000 of movies and tv series. The dataset contains 7 data files: "title.akas.tsv”, “title.basics.tsv”, “title.crew.tsv”, “title.episode.tsv”, “title.principals.tsv”, “title.ratings.tsv”, and “name.basics.tsv”. As we intend this project to provide users with Netflix TV series and movies rating statistics, we will primarily focus on using "title.akas.tsv”, “title.basics.tsv”, “title.episode.tsv”, “title.ratings.tsv”, “name.basics.tsv”. 

3. [48K IMDB Movies With Posters](https://www.kaggle.com/datasets/rezaunderfit/48k-imdb-movies-with-posters): It includes images with the IMDB movie identifiers, so that we can use these images for frontend display.

