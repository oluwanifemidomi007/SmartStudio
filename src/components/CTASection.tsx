import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 dark:from-primary/5 dark:via-primary/10 dark:to-primary/5" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="bg-black dark:bg-gray-900 text-white rounded-2xl p-10 md:p-12 shadow-glass">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
                Pamper Yourself Today
              </h2>
              <p className="text-gray-300">
                Book your appointment now and experience the Smart TS Studio difference. Your
                beauty, our craft.
              </p>
            </div>
            <div className="md:text-right">
              <Link
                to="/booking"
                className="inline-block bg-primary text-black px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
