import React from 'react';

const Layout = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return <div>No photos to display</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
              alt={photo.title}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
