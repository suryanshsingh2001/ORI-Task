import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Layout, SearchBar } from "./Components";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const APIKey = import.meta.env.VITE_REACT_APP_FLICKR_API_KEY;
  const fetchRecentPhotos = async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKey}&safe_search=1&format=json&nojsoncallback=1`
      );
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.error("Error fetching recent photos:", error);
    }
  };

  useEffect(() => {
    fetchRecentPhotos();
  }, []);

  const handleSearch = async (searchResults) => {
    setPhotos(searchResults);
  };

  return (
    <main className="bg-gradient-to-b from-white to-gray-100 h-screen">
      <Header />
      <div className="mx-auto max-w-screen-xl">
        <div className="mt-8">
          <SearchBar className="fixed" onSearch={handleSearch} />
        </div>
        <div className="mt-20">
          <Layout photos={photos} />
        </div>
      </div>
    </main>
  );
};

export default App;
