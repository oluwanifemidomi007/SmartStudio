import React from 'react';

const brands = ['L 3real', 'O.P.I', 'Schwarzkopf', 'Wella', 'MAC', 'Nivea'];

const BrandsMarquee: React.FC = () => {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
          {brands.map(b => (
            <div
              key={b}
              className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm md:text-base hover:text-black dark:hover:text-white transition"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsMarquee;
