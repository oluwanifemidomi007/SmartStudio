import React from 'react';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Stylist',
    avatar: 'https://images.generated.photos/PlV2J0b6dP4m8nK1eU9x-nigerian-woman-1.jpg',
  },
  {
    name: 'Maria Garcia',
    role: 'Nail Specialist',
    avatar: 'https://images.generated.photos/QXk8nNa5n-NG-nigerian-woman-2.jpg',
  },
  {
    name: 'Lisa Chen',
    role: 'Skincare Expert',
    avatar: 'https://images.generated.photos/ACDfNnNn89-nigerian-woman-3.jpg',
  },
  {
    name: 'Ava Patel',
    role: 'Colorist',
    avatar: 'https://images.generated.photos/ZzQp-TLaa-nigerian-woman-4.jpg',
  },
  {
    name: 'Emma Wilson',
    role: 'Makeup Artist',
    avatar: 'https://images.generated.photos/KkYp7GUaa-nigerian-woman-5.jpg',
  },
  {
    name: 'Olivia Brown',
    role: 'Receptionist',
    avatar: 'https://images.generated.photos/nk8p3t-LL-nigerian-woman-6.jpg',
  },
];

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-black dark:text-white">
          Meet Our Team
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          A passionate, talented crew dedicated to bringing out your best look.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(m => (
            <div
              key={m.name}
              className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
            >
              <img src={m.avatar} alt={m.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black dark:text-white">{m.name}</h3>
                <p className="text-primary font-medium">{m.role}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                  With years of experience and a keen eye for detail, {m.name.split(' ')[0]} ensures
                  every client leaves smiling.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
