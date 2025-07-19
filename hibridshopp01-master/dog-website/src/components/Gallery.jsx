import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useData } from '../contexts/DataContext';

// Import default gallery images
import img1 from '../assets/371091897_839629824179864_1843142989333076425_n.jpg';
import img2 from '../assets/viber_kep_2025-06-12_17-54-04-740.jpg';
import img3 from '../assets/viber_kep_2025-06-12_17-54-15-104.jpg';
import img4 from '../assets/viber_kep_2025-06-12_17-57-51-752.jpg';
import img5 from '../assets/viber_kep_2025-06-12_17-57-52-245.jpg';
import img6 from '../assets/viber_kep_2025-06-12_17-57-52-976.jpg';

const defaultGalleryImages = [
  { id: 1, src: img1, alt: 'Hibrid Shopp - Családi pillanat', category: 'family' },
  { id: 2, src: img2, alt: 'Maltipoo kiskutya', category: 'maltipoo' },
  { id: 3, src: img3, alt: 'Cavapoo kiskutya', category: 'cavapoo' },
  { id: 4, src: img4, alt: 'Goldendoodle kiskutya', category: 'goldendoodle' },
  { id: 5, src: img5, alt: 'Játékos kiskutya', category: 'puppies' },
  { id: 6, src: img6, alt: 'Aranyos kiskutya', category: 'puppies' },
];

const categories = [
  { id: 'all', name: 'Összes', icon: Camera },
  { id: 'family', name: 'Családi', icon: Heart },
  { id: 'maltipoo', name: 'Maltipoo', icon: Camera },
  { id: 'cavapoo', name: 'Cavapoo', icon: Camera },
  { id: 'goldendoodle', name: 'Goldendoodle', icon: Camera },
  { id: 'puppies', name: 'Kiskutyák', icon: Heart },
  { id: 'slideshow', name: 'Slideshow', icon: Camera },
];

const Gallery = () => {
  const { galleryImages, slideshowImages } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine gallery and slideshow images
  const allImages = [...galleryImages, ...slideshowImages];
  const images = allImages.length > 0 ? allImages : defaultGalleryImages;

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, filteredImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Galéria
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tekintsd meg gyönyörű kutyáinkat és boldog pillanatainkat
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg transform scale-105'
                  : 'border-amber-600 text-amber-600 hover:bg-amber-50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Camera className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nincsenek képek ebben a kategóriában
            </h3>
            <p className="text-gray-500">
              Válassz másik kategóriát vagy nézd meg az összes képet
            </p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Close Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {filteredImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;