'use client';

import { FC, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface DTFImageGalleryProps {
  images: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
}

const DTFImageGallery: FC<DTFImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => openImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-sm font-medium truncate">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            className="max-w-4xl max-h-[80vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-semibold mb-2">
                {images[selectedImage].title}
              </h3>
              <p className="text-white/80 text-sm max-w-2xl mx-auto">
                {images[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DTFImageGallery;