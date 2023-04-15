import React from 'react';
import styled from "styled-components";
import background from "../assets/background.jpg";
import PeopleList from "../components/PeopleList";
import PeopleFilter from "../components/PeopleFilter";

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
  background-color: rgba(0, 0, 0, 0.2);
  padding: 100px 40px 0;
  box-sizing: border-box;
  color: #fff;
`;
  
const People = () => {
  return (
    <BackgroundImage>
      <MainContainter>
        <PeopleFilter />
        <PeopleList />
      </MainContainter>
    </BackgroundImage>
  );
};
  
export default People;