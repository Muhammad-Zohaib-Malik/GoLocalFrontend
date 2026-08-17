import React from "react";
import { FaTimes } from "react-icons/fa";

const DynamicGallery = ({ gallery = [] }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4 mt-8">Event Gallery</h2>

      {gallery.length === 0 ? (
        <p className="text-gray-600">No images available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md group"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={typeof image === "string" ? image : image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
          <img
            src={
              typeof selectedImage === "string" ? selectedImage : selectedImage
            }
            alt="Selected Gallery Image"
            className="max-w-[90%] max-h-[90%] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors bg-black/50 p-2 rounded-full"
            onClick={handleCloseModal}
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicGallery;
