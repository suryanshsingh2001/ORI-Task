import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

/**
 * SearchBar component for searching images using the Flickr API.
 * @param {Function} onSearch - Function to handle the search results.
 * @param {string[]} suggestions - List of search suggestions.
 * @returns {JSX.Element} SearchBar component elements.
 */

const SearchBar = ({ onSearch, suggestions }) => {
  //States for the search term and search history
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Flickr API key
  const APIKey = import.meta.env.VITE_REACT_APP_FLICKR_API_KEY;

  // Function to handle the search input change
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

  // Function to save the search term to local storage
  const saveSearchTermToLocalStorage = (searchTerm) => {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!searchHistory.includes(searchTerm)) {
      searchHistory.push(searchTerm);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      setSearchHistory(searchHistory);
    }
  };

  // Function to clear the search history
  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  // Function to handle the search
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

  // Function to fetch recent photos
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

  // Function to handle the suggestion click
  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  // Fetch recent photos on component mount
  useEffect(() => {
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(searchHistory);
  }, []);

  // Return the search bar component elements
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="fixed">
        <div className="relative w-72">
          <input
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-2 rounded-lg text-sm focus:outline-blue-500"
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
