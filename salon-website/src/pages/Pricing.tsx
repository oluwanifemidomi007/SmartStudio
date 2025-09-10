import React from 'react';

const pricing = [
  {
    category: 'Hair',
    items: [
      { name: 'Classic Haircut', price: 30 },
      { name: 'Hair Coloring', price: 80 },
      { name: 'Blowout & Style', price: 35 },
    ],
  },
  {
    category: 'Nails',
    items: [
      { name: 'Manicure', price: 25 },
      { name: 'Pedicure', price: 35 },
      { name: 'Gel Polish', price: 20 },
    ],
  },
  {
    category: 'Skin',
    items: [
      { name: 'Facial Glow', price: 50 },
      { name: 'Deep Cleanse Facial', price: 65 },
      { name: 'Waxing', price: 20 },
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-black">Pricing</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Transparent prices for premium services. Taxes included.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map(group => (
            <div key={group.category} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">{group.category}</h2>
              <ul className="space-y-3">
                {group.items.map(it => (
                  <li key={it.name} className="flex items-center justify-between">
                    <span className="text-gray-700">{it.name}</span>
                    <span className="text-black font-semibold">${it.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/booking"
            className="inline-block bg-primary text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-primary transition"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
