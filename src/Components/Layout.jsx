import React from 'react';

const Layout = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return <div>No photos to display</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-8">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
              alt={photo.title || "Unknown"}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{photo.title || "Unknown"}</h3>
              <a
                href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-500 font-semibold mt-4 hover:underline"
              >
                View on Flickr
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
