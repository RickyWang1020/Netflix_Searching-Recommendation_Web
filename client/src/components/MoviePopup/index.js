import React from "react";
import './index.css';

const MoviePopup = ({ movieId, onClose }) => {
    return (
        <div className="movie-popup">
            <div className="movie-popup-content">
                <div className="movie-popup-header">
                    <div className="movie-popup-title">Movie Title</div>
                    <div className="movie-popup-close" onClick={onClose} />
                </div>
                <div className="movie-popup-body">
                </div>
            </div>
        </div>
    );
}

export default MoviePopup;