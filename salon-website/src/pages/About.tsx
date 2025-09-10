import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">About Us</h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              BeautyPhantom was founded with a simple mission: to provide exceptional beauty
              services in a luxurious, welcoming environment. Our journey began with a passion for
              helping clients feel confident and beautiful.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Today, we're proud to be one of the most trusted beauty salons in the area, offering a
              comprehensive range of services from haircuts and styling to advanced skincare
              treatments.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To provide exceptional beauty services that enhance our clients' natural beauty and
              boost their confidence. We believe everyone deserves to feel beautiful and pampered.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-600 dark:text-gray-300">👩‍🦰</span>
                </div>
                <h3 className="font-semibold text-lg text-black dark:text-white">Sarah Johnson</h3>
                <p className="text-gray-600 dark:text-gray-300">Senior Stylist</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-600 dark:text-gray-300">💅</span>
                </div>
                <h3 className="font-semibold text-lg text-black dark:text-white">Maria Garcia</h3>
                <p className="text-gray-600 dark:text-gray-300">Nail Specialist</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-600 dark:text-gray-300">🧖‍♀️</span>
                </div>
                <h3 className="font-semibold text-lg text-black dark:text-white">Lisa Chen</h3>
                <p className="text-gray-600 dark:text-gray-300">Skincare Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
