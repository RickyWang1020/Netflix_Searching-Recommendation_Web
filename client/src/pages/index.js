
import React from "react";
import './pages.css'
import StatsList from "../components/StatsList";
import TopMovieList from "../components/TopMovieList";
import TopPeopleList from "../components/TopPeopleList";
import ButtomBar from "../components/ButtomBar";
import PosterCarousel from "../components/PosterCarousel";

const panelsContainer = {
  width: '100vw',
  height: '900px',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
};

const panels = {
  flex: 1,
  height: '100%',
};

const Home = () => {
  return (
    <div className="page-background">
      <div className="page-container" style={{padding: '80px 0'}}>
        <PosterCarousel />
        <div style={panelsContainer}>
          <StatsList style={panels} />
          <TopMovieList style={panels} />
          <TopPeopleList style={panels} />
        </div>
      </div>
      <ButtomBar />
    </div>
  );
};
  
export default Home;