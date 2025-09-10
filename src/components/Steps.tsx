import React from 'react';

const steps = [
  { num: '01', title: 'Choose Service', desc: 'Pick from our curated list of treatments.' },
  { num: '02', title: 'Select Time', desc: 'Find a convenient slot that fits your schedule.' },
  { num: '03', title: 'Look Amazing', desc: 'Visit us and leave feeling refreshed and confident.' },
];

const Steps: React.FC = () => {
  return (
    <section className="py-16 bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(s => (
            <div
              key={s.num}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <div className="text-4xl font-extrabold text-primary mb-3">{s.num}</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
