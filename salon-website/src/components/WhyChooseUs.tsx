import React from 'react';

const features = [
  {
    title: 'Luxury Experience',
    description: 'Relax in our modern, cozy studio designed for comfort and elegance.',
    emoji: '🌟',
  },
  {
    title: 'Skilled Professionals',
    description: 'Certified stylists and estheticians dedicated to your perfect look.',
    emoji: '🎓',
  },
  {
    title: 'Premium Products',
    description: 'We use high‑quality, skin‑friendly products for lasting results.',
    emoji: '🧴',
  },
  {
    title: 'Easy Online Booking',
    description: 'Schedule appointments in seconds with real‑time availability.',
    emoji: '📅',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-black dark:text-white">
          Why Choose Us
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          We blend creativity, precision, and care to craft an experience you will love returning
          to.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
