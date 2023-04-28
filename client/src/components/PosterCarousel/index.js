import React, { useState, useEffect } from "react";
import { Carousel } from 'antd';
import "./style.css"
import poster1 from "../../assets/images/band-of-brothers.avif";
import poster2 from "../../assets/images/the-godfather.jpeg";
import poster3 from "../../assets/images/3.png";
import poster4 from "../../assets/images/4.jpg";
import poster5 from "../../assets/images/5.png";
import poster6 from "../../assets/images/6.png";
import poster7 from "../../assets/images/7.jpg";
import poster8 from "../../assets/images/8.jpg";
import poster9 from "../../assets/images/9.jpg";
import poster10 from "../../assets/images/10.jpg";

const config = require('../../config.json');

const PosterCarousel = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/movie_after/1950`)
          .then(res => res.json())
          .then(data => setData(data))
          .catch(error => console.log(error));
    }, []);

    const sortedData = [...data].sort((a, b) => b.average_rating - a.average_rating);
    const topTen = sortedData.slice(0, 10);
    const shuffled = [...topTen].sort(() => Math.random() - 0.5);
    const topFour = shuffled.slice(0, 4);

    const imageMap = {
        15296: poster1,
        12293: poster2,
        12870: poster3,
        7751: poster4,
        1587: poster5,
        1499: poster6,
        7639: poster7,
        2803: poster8,
        16377: poster9,
        4383: poster10
    };

    return (
        <Carousel className="poster-carousel" autoplay>
            {topFour.map((item) => (
                <div className="carousal-item">
                <div className="carousal-item-group">
                        <img className="carousal-img" src={imageMap[item.movie_id]} alt={item.title} />
                        <div className="carousal-text-container">
                            <div className="text" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: "2.8rem" }}>{item.title}</div>
                            <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>{item.runtimeMinutes} mins | {item.year_of_release}</div>
                            <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>{item.average_rating.toFixed(2)}/5</div>
                            <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>Genres: {item.genres}</div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default PosterCarousel;