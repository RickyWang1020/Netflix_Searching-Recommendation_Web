import React, { useState, useEffect  } from "react";
import './style.css';
import { Rate, Progress } from 'antd';
const config = require('../../config.json');

const MoviePopup = ({ movieData, onClose }) => {
    const [ratingDist, setRatingDist] = useState([]);
    const [totalRating, setTotalRating] = useState(0);
    const [genreDefeat, setGenreDefeat] = useState([]);
    
    const desc = ['terrible', 'bad', 'normal', 'good', 'excellent'];

    useEffect(() => {
        let movieId = movieData.movie_id;
        fetch(`http://${config.server_host}:${config.server_port}/movie_id_distribution/${movieId}`)
            .then((res) => res.json())
            .then(data => {
                let ratingCount = new Array(5).fill(0);
                let sum = 0;
                for (let i = 0; i < 5; i++) {
                    if (data[i]) {
                        ratingCount[data[i].rating - 1] = data[i].count;
                        sum += data[i].count;
                    }
                }
                
                let ratingDist = ratingCount.map((count) => (count / sum * 100).toFixed(1));
                
                setTotalRating(sum);
                setRatingDist(ratingDist);
            }
        );
        fetch(`http://${config.server_host}:${config.server_port}/genre_defeat/${movieId}`)
            .then((res) => res.json())
            .then(data => {
                setGenreDefeat(data);
            }
        );
    }, []);

    return (
        <div className="movie-popup">
            <div className="movie-popup-content">
                <div className="movie-popup-close" onClick={onClose} />
                <div className="movie-popup-title">{movieData.title}</div>
                <div>
                    <div className="movie-popup-split">
                        <div className="movie-popup-desc" style={{margin: '10px 0 0'}}><b>Year:</b> {movieData.year_of_release}</div>
                        <div className="movie-popup-desc"><b>Is Adult:</b> {movieData.isAdult? "True":"False"}</div>
                        <div className="movie-popup-desc"><b>Runtime:</b> {movieData.runtimeMinutes} mins</div>
                        <div className="movie-popup-desc"><b>Rating:</b> {movieData.avg_rate.toFixed(2)}/5</div>
                        <div className="movie-popup-desc"><b>Genres:</b> {movieData.genres.split(',').map((genre) => genre + '; ')}</div>
                    </div>
                    <div className="movie-popup-split">
                        <div className="movie-popup-desc" style={{margin: '10px 0'}}><b>Rating Distributions</b></div>
                        {ratingDist.map((dist, index) => (
                            <div className="rating-container" key={index}>
                                <Rate defaultValue={0} tooltips={desc} value={index + 1} style={{display: 'inline-block'}} disabled/>
                                <div className="rating-text">{dist}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="movie-popup-genre">
                        <div className="genre-group">
                            {genreDefeat.map((genre, index) => (
                                <div className="genre-item" key={index}>
                                    <div className="movie-popup-desc" style={{margin: '0 0 20px'}}><b>{genre.genre}</b></div>
                                    <Progress type="circle" percent={(genre.defeat_perc * 100).toFixed(1)} format={(percent) => `${percent} %`} />
                                    <div className="movie-popup-desc genre-deaf-desc">
                                        Defeated <b>{genre.lower_rate_count}</b> out of <b>{genre.total_count}</b> movies in this genre
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;