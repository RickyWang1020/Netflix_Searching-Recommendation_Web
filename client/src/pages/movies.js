
import React from 'react';
import './pages.css'
import MovieList from "../components/MovieList";
import ButtomBar from "../components/ButtomBar";

const Movies = () => {
  return (
    <div className="page-background">
      <div className="page-container" style={{padding: '70px 0'}}>
        <MovieList />
      </div>
      <ButtomBar />
    </div>
  );
};
  
export default Movies;