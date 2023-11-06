import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const SearchBar = ({ onSearch, suggestions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const APIKey = import.meta.env.VITE_REACT_APP_FLICKR_API_KEY;

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (!newSearchTerm) {
      fetchRecentPhotos();
    } else {
      handleSearch(newSearchTerm);
      saveSearchTermToLocalStorage(newSearchTerm);
    }
  };

  const saveSearchTermToLocalStorage = (searchTerm) => {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!searchHistory.includes(searchTerm)) {
      searchHistory.push(searchTerm);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      setSearchHistory(searchHistory);
    }
  };

  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const handleSearch = _.debounce(async (searchTerm) => {
    try {
      console.log("Searching for:", searchTerm);
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&text=${searchTerm}&safe_search=1&format=json&nojsoncallback=1`
      );
      onSearch(response.data.photos.photo);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, 500);

  const fetchRecentPhotos = async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKey}&safe_search=1&format=json&nojsoncallback=1`
      );

      onSearch(response.data.photos.photo);
    } catch (error) {
      console.error("Error fetching recent photos:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  useEffect(() => {
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(searchHistory);
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="fixed">
        <div className="relative w-72">
          <input
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-2 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search images..."
          />
          {searchHistory.length > 0 && (
            <button
              className="relative l-10 left-0 top-0 h-full px-3 flex items-center text-red-400 hover:text-gray-700 focus:outline-none transition duration-300"
              onClick={clearSearchHistory}
            >
              Clear Suggestions
            </button>
          )}
        </div>

        {/* Suggestions */}
        {searchHistory.length > 0 && (
          <div className="w-72">
            <div className="relative">
              <div className="absolute w-full z-10 bg-white mt-1 py-2 rounded-lg shadow-lg flex flex-wrap">
                {searchHistory.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 m-1 bg-gray-100 text-gray-800 rounded-lg cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
