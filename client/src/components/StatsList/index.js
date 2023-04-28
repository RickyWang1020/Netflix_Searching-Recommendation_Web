import React, {useState, useEffect} from "react";
import './style.css'
import TopGenre from "./StatsPanels/genre.js";
import RatingOverTime from "./StatsPanels/ratingOverTime.js";
import RuntimeOverTime from "./StatsPanels/runtimeOverTime.js";

const StatsList = () => {
    return (
        <div className="stats-list">
            <TopGenre />
            <RatingOverTime />
            <RuntimeOverTime />
        </div>
    );
}

export default StatsList;