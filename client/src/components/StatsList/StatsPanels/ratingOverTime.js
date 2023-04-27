import './panel.css'
import React, {useState, useEffect} from "react";
const config = require('../../../config.json');

const RatingOverTime = () => {
    return (
        <div className="stats-panel">
            <div className="title">Genre's Rating Over Time</div>
            <div className="panel-body-container">
            </div>
        </div>
    );
}

export default RatingOverTime;