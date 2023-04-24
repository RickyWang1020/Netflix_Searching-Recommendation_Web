import React from 'react';
import './pages.css'
import CastList from "../components/CastList";
import DirectorList from "../components/DirectorList";
import WriterList from "../components/WriterList";
import ButtomBar from "../components/ButtomBar";

const People = () => {
  return (
    <div className="page-background">
      <div className="page-container">
        <CastList />
        </div>
      <ButtomBar />
    </div>
  );
};
  
export default People;