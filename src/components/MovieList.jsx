// MovieList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/datafilm';
import requests from '../api/requests';
import { auth, onAuthStateChanged } from '../firebaseConfig'; // Import Firebase auth
import '../assets/style/MovieList.css';

const categories = {
  'All Films': requests.fetchPopularMovies,
  'Action': requests.fetchActionMovies,
  'Comedy': requests.fetchComedyMovies,
  'Horror': requests.fetchHorrorMovies,
  'Romance': requests.fetchRomanceMovies,
  'Documentary': requests.fetchDocumentaries,
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('All Films');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(categories[category]);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, [category]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleCardClick = (movieId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/detailmovie/${movieId}`);
    }
  };

  const getGenres = (genre_ids) => {
    // Optionally map genre_ids to genre names if you have a list of genre names
    return genre_ids.join(', ');
  };

  const getRandomDuration = () => {
    // Generate a random duration between 1.5 hours and 3 hours
    const hours = Math.floor(Math.random() * 1.5) + 1; // Random hours between 1 and 2
    const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    return `${hours}h ${minutes}m`;
  };

  return (
    <section id="movies">
      <div className="movie-list-container">
        <div className="container-fluid">
          <div className="movie-header">
            <h2>OPENING THIS WEEK</h2>
            <div className="movie-filters">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  className={`btn ${category === cat ? 'btn-danger' : 'btn-dark'}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="movie-grid-container">
            <div className="movie-grid">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => handleCardClick(movie.id)}>
                  <div className="movie-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="img-fluid"
                    />
                    <div className="movie-overlay">
                      <button className="btn btn-danger">Book Now</button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <div className="movie-details">
                      <span>{getRandomDuration()}</span>
                      <span className="divider">|</span>
                      <span>{movie.genre_ids ? getGenres(movie.genre_ids) : 'Genres not available'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-end mt-3">
            <a href="#" className="more-link">More...</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieList;