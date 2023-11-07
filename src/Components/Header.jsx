import React from "react";

/**
 * Header component for the PicEyes application.
 * Displays the application header with a gradient background and a title.
 * @returns {JSX.Element} Header component elements.
 */
const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center bg-gradient-to-r from-red-600 to-yellow-500 text-white">
      <h1 className="text-4xl font-bold mb-2">PicEyes</h1>
      <p className="text-lg">See the World Through Images</p>
    </header>
  );
};

export default Header;
