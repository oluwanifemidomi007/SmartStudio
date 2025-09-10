import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getGalleryImages } from '../utils/storage';

const Gallery: React.FC = () => {
  const [adminGallery, setAdminGallery] = useState<string[]>([]);

  useEffect(() => {
    setAdminGallery(getGalleryImages());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'smartstudio-gallery-images') setAdminGallery(getGalleryImages());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const galleryItems = [
    {
      id: 1,
      title: 'Hair Styling',
      image: 'https://source.unsplash.com/600x400/?nigerian,hair,salon',
      category: 'Hair',
    },
    {
      id: 2,
      title: 'Nail Art',
      image: 'https://source.unsplash.com/600x400/?nigerian,manicure,nails',
      category: 'Nails',
    },
    {
      id: 3,
      title: 'Facial Treatment',
      image: 'https://source.unsplash.com/600x400/?nigeria,facial,skincare',
      category: 'Skincare',
    },
    {
      id: 4,
      title: 'Makeup',
      image: 'https://source.unsplash.com/600x400/?nigeria,makeup,beauty',
      category: 'Makeup',
    },
    {
      id: 5,
      title: 'Hair Coloring',
      image: 'https://source.unsplash.com/600x400/?nigeria,hair,color',
      category: 'Hair',
    },
    {
      id: 6,
      title: 'Manicure',
      image: 'https://source.unsplash.com/600x400/?nigeria,manicure,spa',
      category: 'Nails',
    },
  ];

  const sliderVideos = [
    { id: 1, image: '/video/Download (1).mp4', title: 'Hair Styling', category: 'Hair' },
    {
      id: 2,
      image: '/video/Download (3).mp4',
      title: 'Toe Nails & Feet Treatment',
      category: 'Pedicure',
    },
    { id: 3, image: '/video/Download (7).mp4', title: 'Nail Fixing', category: 'Manicure' },
    { id: 4, image: '/video/Download (5).mp4', title: 'Facial Treatment', category: 'Facial' },
    { id: 5, image: '/video/Download (8).mp4', title: 'Haircut', category: 'Barbing' },
  ];

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8 text-black dark:text-white"
        >
          Our Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Take a look at some of our amazing work and transformations. Each image represents the
          dedication and skill of our talented team.
        </motion.p>

        {/* Admin uploaded images shown first */}
        {adminGallery.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
              Latest Uploads
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminGallery.map((src, idx) => (
                <div
                  key={`admin-${idx}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <img src={src} alt={`upload-${idx}`} className="w-full h-64 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            speed={3000}
            loop={false}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-lg overflow-hidden"
          >
            {sliderVideos.map(item => (
              <SwiperSlide key={item.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <video
                    src={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-64 object-cover"
                  ></video>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.category}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
