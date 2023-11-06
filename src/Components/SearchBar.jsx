import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const SearchBar = ({ onSearch, suggestions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const APIKey = "cc186057a3a48ee614f32e2e3393945c";

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (!newSearchTerm) {
      fetchRecentPhotos();
    } else {
      handleSearch(newSearchTerm);
    }
  };

  const handleSearch = _.debounce(async (searchTerm) => {
    try {
      console.log("Searching for:", searchTerm);
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&text=${searchTerm}&safe_search=1&format=json&nojsoncallback=1`
      );
      console.log("Flickr API response:", response);
      onSearch(response.data.photos.photo);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, 500);

  const fetchRecentPhotos = async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKey}&safe_search=3&format=json&nojsoncallback=1`
      );
      console.log("Recent photos response:", response.data);
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

  console.log("Current suggestions:", suggestions);

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="relative text-gray-600 w-72">
        <input
          className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search images..."
        />
      </div>

      {/* Suggestions */}
      {suggestions?.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="m-1 px-2 py-1 bg-gray-200 text-gray-800 rounded-lg cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default SearchBar;
