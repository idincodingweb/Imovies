import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/datafilm';
import requests from '../api/requests';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/style/News.css';

const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(requests.fetchHorrorMovies); // Menggunakan endpoint fetchHorrorMovies
        setNewsItems(response.data.results);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    };

    fetchNews();
  }, []);

  const handleCardClick = (newsId) => {
    navigate(`/detailmovie/${newsId}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="news">
      <div className="news-section">
        <div className="container">
          <h2 className="section-title text-center mb-4">NEWS</h2>

          <div className="news-carousel position-relative">
            <div className="news-items" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="news-item"
                  onClick={() => handleCardClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="news-image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="news-title">
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            <button className="carousel-control next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>

            <div className="carousel-indicators">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
