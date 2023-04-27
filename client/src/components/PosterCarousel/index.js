import React from "react";
import { Carousel } from 'antd';
import "./index.css"

import poster1 from "../../assets/images/band-of-brothers.avif";
import poster2 from "../../assets/images/house.jpeg";
import poster3 from "../../assets/images/the-godfather.jpeg";
import poster4 from "../../assets/images/samurai-champloo.jpeg";

const PosterCarousel = () => {
    return (
        <Carousel className="poster-carousel" autoplay>
            <div className="carousal-item">
                <div className="carousal-item-group">
                    <img className="carousal-img" src={poster1} alt="poster1" />
                    <div className="carousal-text-container">
                        <div className="text" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: "2.8rem" }}>Band of Brothers</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>2001</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>TV-MA 4.51/5</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>Genres: Drama, History, War</div>
                    </div>
                </div>
            </div>
            <div className="carousal-item">
                <div className="carousal-item-group">
                    <img className="carousal-img" src={poster2} alt="poster2" />
                    <div className="carousal-text-container">
                        <div className="text" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: "2.8rem" }}>House</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>2004</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>TV-14 4.52/5</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>Genres: Drama, Mystery</div>
                    </div>
                </div>
            </div>
            <div className="carousal-item">
                <div className="carousal-item-group">
                    <img className="carousal-img" src={poster3} alt="poster3" />
                    <div className="carousal-text-container">
                        <div className="text" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: "2.8rem" }}>The Godfather</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>1972</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>R 4.50/5</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>Genres: Crime, Drama</div>
                    </div>
                </div>
            </div>
            <div className="carousal-item">
            <div className="carousal-item-group">
                    <img className="carousal-img" src={poster4} alt="poster4" />
                    <div className="carousal-text-container">
                        <div className="text" style={{ fontSize: "2.8rem", fontWeight: "bold", lineHeight: "2.8rem" }}>Samurai Champloo</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>2004</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>TV-MA 4.47/5</div>
                        <div className="text" style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}>Genres: Animation, Action, Adventure</div>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default PosterCarousel;