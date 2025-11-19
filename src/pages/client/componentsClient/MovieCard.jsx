import React from "react";
import { Link } from "react-router-dom";


const MovieCard = ({ title, genre, duration }) => {
  return (
    <article className="movie-card">
      <div className="movie-card__image-placeholder" />

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__genre">{genre}</p>

        <div className="movie-card__meta">
          <span className="movie-card__duration-icon">⏱</span>
          <span className="movie-card__duration">{duration} min</span>
        </div>

        <Link to="/funciones" className="movie-card__button">  
          Ver Funciones 
        </Link>

      </div>
    </article>
  );
};

export default MovieCard;
