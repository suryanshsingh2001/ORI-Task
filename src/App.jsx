/**
 * The main component of the application.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Layout, SearchBar } from "./Components";

/**
 * The main App component.
 */
const App = () => {
  // State for storing fetched photos
  const [photos, setPhotos] = useState([]);

  // Fetch recent photos using Flickr API
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

  // Fetch recent photos on component mount
  useEffect(() => {
    fetchRecentPhotos();
  }, []);

  // Handle search results from the SearchBar component
  const handleSearch = async (searchResults) => {
    setPhotos(searchResults);
  };

  return (
    // Main container with a background gradient
    <main className="bg-gradient-to-b from-white to-gray-100 h-screen">
      {/* Header component */}
      <Header />

      {/* Max width container */}
      <div className="mx-auto max-w-screen-xl">
        {/* SearchBar component */}
        <div className="mt-8">
          <SearchBar className="fixed" onSearch={handleSearch} />
        </div>

        {/* Layout component to display fetched photos */}
        <div className="mt-20">
          <Layout photos={photos} />
        </div>
      </div>
    </main>
  );
};

export default App;
