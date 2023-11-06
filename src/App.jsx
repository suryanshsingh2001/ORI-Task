import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Layout, SearchBar } from './Components';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const APIKey = 'cc186057a3a48ee614f32e2e3393945c';
  const fetchRecentPhotos = async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKey}&safe_search=3&format=json&nojsoncallback=1`
      );
      console.log('Recent photos response:', response.data);
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.error('Error fetching recent photos:', error);
    }
  };

  useEffect(() => {
    fetchRecentPhotos();
  }, []);

  const handleSearch = async (searchResults) => {
    setPhotos(searchResults);
  };

  return (
    <main>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Layout photos={photos} />
    </main>
  );
};

export default App;
