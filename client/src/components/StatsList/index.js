import React, {useState, useEffect} from "react";
import { List, Slider, Row, Col, Typography, Progress } from 'antd';
import './index.css'
import TopGenre from "./StatsPanels/genre.js";
import RatingOverTime from "./StatsPanels/ratingOverTime.js";
import RuntimeOverTime from "./StatsPanels/runtimeOverTime.js";


const { Title } = Typography;

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