
import React from "react";
import './pages.css'
import { Carousel } from 'antd';
import StatsList from "../components/StatsList";
import TopMovieList from "../components/TopMovieList";
import TopPeopleList from "../components/TopPeopleList";
import ButtomBar from "../components/ButtomBar";


const contentStyle = {
  height: '180px',
  color: '#fff',
  lineHeight: '180px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
};
const carouselContainer = {
  width: '100vw',
  position: 'relative',
  margin: '10px 0 0',
};
const panelsContainer = {
  width: '100vw',
  height: 'calc(100vh - 380px)',
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
      <div className="page-container">
        <Carousel style={carouselContainer} autoplay>
          <div>
            <h3 style={contentStyle}>Recommended Movie 1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>Recommended Movie 2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>Recommended Movie 3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>Recommended Movie 4</h3>
          </div>
        </Carousel>
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