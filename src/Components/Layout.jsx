import React, { useState } from "react";
import Modal from "react-modal";

const Layout = ({ photos }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setModalIsOpen(true);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  };

  if (!photos || photos.length === 0) {
    return <div>No photos to display</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-8">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}  
            className="bg-white rounded-lg overflow-hidden shadow-lg"
            onClick={() => openModal(photo)}
          >
            <img
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
              alt={photo.title || "Unknown"}
              className="w-full h-64 object-cover cursor-pointer"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {photo.title || "Unknown"}
              </h3>
              <a
                href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View on Flickr
              </a>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "50%",
            height: "auto",
            margin: "auto",
          },
        }}
      >
        {selectedPhoto && (
          <div>
            <button
              className="text-xl font-semibold mb-2"
              onClick={closeModal}
              style={{ float: "right" }}
            >
            X
            </button>
            <img
              src={`https://live.staticflickr.com/${selectedPhoto.server}/${selectedPhoto.id}_${selectedPhoto.secret}_b.jpg`}
              alt={selectedPhoto.title || "Unknown"}
              className="w-full h-auto"
            />
            <p className="mt-4 text-xl font-semibold  text-center">{selectedPhoto.title || "Unknown"}</p>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default Layout;
