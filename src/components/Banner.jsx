// Banner.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/datafilm';
import requests from '../api/requests';
import '../assets/style/Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      try {
        const response = await axios.get(requests.fetchHorrorMovies);
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchHorrorMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${dayName}, ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  if (!movie) return null;

  return (
    <div className="banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="movie-title">{movie.title || movie.name || movie.original_name}</h1>
            <div className="movie-details">
              <span>{movie.release_date?.substring(0, 4)}</span>
            </div>
            <p className="tagline">{truncate(movie.overview, 150)}</p>
            <div className="action-buttons">
              <button className="btn btn-danger me-3">Book Now</button>
              <button className="btn btn-outline-light">
                <i className="bi bi-play-fill"></i> Watch Trailer
              </button>
            </div>
            <div className="pagination mt-4">
              <span className="active text-white">{formatDate(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;