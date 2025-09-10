import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getServiceImagesMap } from '../utils/storage';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

const categoryImageMap: Record<string, string> = {
  Haircut: 'https://source.unsplash.com/800x600/?haircut,barber',
  Manicure: 'https://source.unsplash.com/800x600/?manicure,nails',
  Pedicure: 'https://source.unsplash.com/800x600/?pedicure,spa',
  Facial: 'https://source.unsplash.com/800x600/?facial,skincare',
  Waxing: 'https://source.unsplash.com/800x600/?waxing,beauty',
  Color: 'https://source.unsplash.com/800x600/?hair,coloring',
  'Hair Coloring': 'https://source.unsplash.com/800x600/?hair,coloring',
};

const getImageForService = (service: Service, adminMap: Record<string, string[]>): string => {
  if (service.image && service.image.trim().length > 0) return service.image;
  const adminArr = adminMap[service.category];
  if (adminArr && adminArr.length > 0) return adminArr[0];
  const byCategory = categoryImageMap[service.category];
  if (byCategory) return byCategory;
  return 'https://source.unsplash.com/800x600/?beauty,salon';
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [adminImages, setAdminImages] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setAdminImages(getServiceImagesMap());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'smartstudio-service-images') {
        setAdminImages(getServiceImagesMap());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([
          {
            id: 1,
            name: 'Classic Haircut',
            category: 'Haircut',
            description: 'A stylish haircut tailored to your preferences.',
            price: 30,
            duration: 45,
            image: '',
          },
          {
            id: 2,
            name: 'Manicure',
            category: 'Manicure',
            description: 'Nail shaping, cuticle care, and polish.',
            price: 25,
            duration: 30,
            image: '',
          },
          {
            id: 3,
            name: 'Facial Glow',
            category: 'Facial',
            description: 'Deep cleansing and rejuvenating facial treatment.',
            price: 50,
            duration: 60,
            image: '',
          },
          {
            id: 4,
            name: 'Pedicure',
            category: 'Pedicure',
            description: 'Complete foot care and nail treatment.',
            price: 35,
            duration: 45,
            image: '',
          },
          {
            id: 5,
            name: 'Waxing',
            category: 'Waxing',
            description: 'Professional hair removal service.',
            price: 20,
            duration: 30,
            image: '',
          },
          {
            id: 6,
            name: 'Hair Coloring',
            category: 'Hair Coloring',
            description: 'Professional hair coloring and highlights.',
            price: 80,
            duration: 120,
            image: '',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(services.map(s => s.category)));
    return ['All', ...unique];
  }, [services]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return services;
    return services.filter(s => s.category === selectedCategory);
  }, [services, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
            Our Services
          </h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Our Services
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-primary text-black border-primary'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-primary hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <img
                src={getImageForService(service, adminImages)}
                alt={service.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-black dark:text-white">
                  ${service.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{service.duration} min</span>
              </div>
              <a
                href="/booking"
                className="mt-4 inline-block text-primary font-semibold hover:text-black"
              >
                Book Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
