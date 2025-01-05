import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollectionDetails = ({ collectionId }) => {
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/collection/${collectionId}`, {
          params: {
            api_key: 'YOUR_API_KEY', // Ganti dengan API key Anda
          },
        });
        setCollection(response.data);
      } catch (error) {
        console.error('Failed to fetch collection details', error);
      }
    };

    if (collectionId) {
      fetchCollectionDetails();
    }
  }, [collectionId]);

  if (!collection) return <div>Loading...</div>;

  return (
    <div>
      <h2>{collection.name}</h2>
      <p>{collection.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`} alt={collection.name} />
      <h3>Movies in this Collection:</h3>
      <ul>
        {collection.parts.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <span>{movie.title} ({movie.release_date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionDetails;