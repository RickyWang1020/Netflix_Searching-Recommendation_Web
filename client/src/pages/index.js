
import React from "react";
import styled from "styled-components";
import background from "../assets/background.jpg";


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
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
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
        <Welcome>
          Welcome to Netflix Recommendation System
        </Welcome>
      </MainContainter>
    </BackgroundImage>
  );
};
  
export default Home;