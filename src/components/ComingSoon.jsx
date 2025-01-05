// ComingSoon.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from '../api/datafilm';
import requests from '../api/requests';
import { auth, onAuthStateChanged } from '../firebaseConfig'; // Import Firebase auth
import '../assets/style/ComingSoon.css';

const ComingSoon = () => {
  const scrollContainerRef = useRef(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(requests.fetchUpcomingMovies);
        setUpcomingMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch upcoming movies', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

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

  const scrollMovies = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
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
    <section id="comingsoon">
      <div className="coming-soon-container">
        <div className="container position-relative">
          <h2 className="section-title">COMING SOON</h2>
          
          <div className="scroll-controls">
            <button 
              className="scroll-button scroll-left"
              onClick={() => scrollMovies('left')}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="scroll-button scroll-right"
              onClick={() => scrollMovies('right')}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="movies-scroll-container" ref={scrollContainerRef}>
            <div className="movies-wrapper">
              {upcomingMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => handleCardClick(movie.id)}>
                  <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img-fluid" />
                    <div className="release-date">
                      <span>{new Date(movie.release_date).toLocaleDateString()}</span>
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
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;