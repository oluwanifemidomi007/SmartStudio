import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-black text-white flex items-center justify-center min-h-[70vh] overflow-hidden">
      <video
        src="/video/6722e45e6b5f42d6b47974a50559d9fc.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>

      <div className="absolute w-full h-full bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-800/80 dark:from-gray-900/70 dark:via-black/70 dark:to-gray-800/70"></div>
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary drop-shadow-lg">
          Unleash Your Beauty
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
          Experience luxury hair, nail, and skin care at our modern salon. Where beauty meets
          excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/booking"
            className="bg-primary text-black px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-black hover:text-primary border-2 border-primary transition duration-300 text-lg"
          >
            Book Now
          </Link>
          <Link
            to="/services"
            className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-black transition duration-300 text-lg"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
