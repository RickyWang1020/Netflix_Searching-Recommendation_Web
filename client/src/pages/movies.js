
import React from 'react';
import './pages.css'
import MovieList from "../components/MovieList";
import ButtomBar from "../components/ButtomBar";

const Movies = () => {
  return (
    <div className="page-background">
      <div className="page-container">
        <MovieList />
      </div>
      <ButtomBar />
    </div>
  );
};
  
export default Movies;