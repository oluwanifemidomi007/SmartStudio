import React from 'react';

const offers = [
  { title: 'New Client Special', desc: '20% off your first service', tag: 'Limited Time' },
  { title: 'Mani + Pedi Combo', desc: 'Save $10 when booked together', tag: 'Bundle' },
  { title: 'Midweek Glow', desc: '15% off facials on Tue-Wed', tag: 'Weekday' },
];

const Offers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-black">Special Offers</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our latest promotions and save on your next visit.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map(o => (
            <div key={o.title} className="bg-white rounded-xl shadow p-6 border-t-4 border-primary">
              <span className="text-xs bg-black text-white px-2 py-1 rounded-full">{o.tag}</span>
              <h3 className="text-xl font-semibold text-black mt-3">{o.title}</h3>
              <p className="text-gray-600 mt-2">{o.desc}</p>
              <a
                href="/booking"
                className="inline-block mt-4 text-primary font-semibold hover:text-black"
              >
                Claim Offer →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
