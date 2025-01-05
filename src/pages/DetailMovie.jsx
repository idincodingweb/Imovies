import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/datafilm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/DetailMovie.css';
import ReactPlayer from 'react-player';

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(`/movie/${id}`, {
          params: {
            language: 'en-US',
            append_to_response: 'videos', // Append videos to get trailer URLs
          },
        });
        setMovie(request.data);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    };

    fetchData();
  }, [id]);

  const getTrailerUrl = () => {
    const trailer = movie.videos?.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '';
  };

  return (
    <div className="movie-detail-container">
      <div className="container-fluid py-5">
        <div className="row">
          {/* Movie Poster Column */}
          <div className="col-md-4 mb-4">
            <div className="movie-poster">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image+Available'} 
                alt={movie.title || movie.name}
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

          {/* Movie Info Column */}
          <div className="col-md-8">
            <div className="movie-info">
              <h1 className="movie-title mb-4">{movie.title || movie.name}</h1>
              
              <div className="movie-meta mb-4">
                <span className="meta-item">
                  <i className="fas fa-star"></i> {movie.vote_average}
                </span>
                <span className="meta-item">
                  <i className="fas fa-clock"></i> {movie.runtime} min
                </span>
                <span className="meta-item">
                  <i className="fas fa-calendar"></i> {movie.release_date ? movie.release_date.substring(0, 4) : ''}
                </span>
              </div>

              <div className="movie-description mb-4">
                <p>{movie.overview}</p>
              </div>

              <div className="movie-genres mb-4">
                {movie.genres?.map((genre, index) => (
                  <span key={index} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="trailer-title mb-4">Trailer Film</h2>
            <div className="trailer-container">
              <ReactPlayer url={getTrailerUrl()} className="movie-trailer" playing controls />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DetailMovie;