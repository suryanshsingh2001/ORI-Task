import React, { useState } from 'react';
import { Header, SearchBar, Layout } from './Components';
import axios from 'axios';

const App = () => {
  const [photos, setPhotos] = useState([]);

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
