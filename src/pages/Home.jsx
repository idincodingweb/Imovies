import React from 'react';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';
import ComingSoon from '../components/ComingSoon';
import News from '../components/News';

const Home = () => {
  
  return(
    <div className="app-container">
     <Banner />
     <MovieList />
     <ComingSoon />
     <News />
    </div>
    )
}

export default Home;