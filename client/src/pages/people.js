import React from 'react';
import './pages.css'
import PeopleList from "../components/PeopleList";
import PeopleFilter from "../components/PeopleFilter";
import ButtomBar from "../components/ButtomBar";
  
const People = () => {
  return (
    <div className="page-background">
      <div className="page-container">
        <PeopleFilter />
        <PeopleList />
        </div>
      <ButtomBar />
    </div>
  );
};
  
export default People;