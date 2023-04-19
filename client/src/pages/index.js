
import React from "react";
import styled from "styled-components";
import background from "../assets/background.jpg";
import { Carousel } from 'antd';
import StatsList from "../components/StatsList";
import TopMovieList from "../components/TopMovieList";
import PeopleList from "../components/PeopleList";


const contentStyle = {
  height: '200px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
};

const carouselContainer = {
  width: '100vw',
  position: 'relative',
  margin: '80px auto 0',
};
const panelsContainer = {
  width: '100vw',
  height: 'calc(100vh - 320px)',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
};
const panels = {
  flex: 1,
  height: '100%',
};

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;
const MainContainter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Welcome = styled.h1`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;
const Home = () => {
  return (
    <BackgroundImage>
      <MainContainter>
        {/* <Welcome>
          Welcome to Netflix Recommendation System
        </Welcome> */}
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
          <PeopleList style={panels} />
        </div>
        <p>CIS5500 Final Project Team 25: Liancheng Gong, Jinyun Shan, Xinran Wang, Zhaoze Wang</p>
      </MainContainter>
    </BackgroundImage>
  );
};
  
export default Home;