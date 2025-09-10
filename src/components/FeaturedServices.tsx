import React, { useEffect, useState } from 'react';
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
  Haircut: 'https://source.unsplash.com/600x400/?haircut,barber',
  Manicure: 'https://source.unsplash.com/600x400/?manicure,nails',
  Pedicure: 'https://source.unsplash.com/600x400/?pedicure,spa',
  Facial: 'https://source.unsplash.com/600x400/?facial,skincare',
  Waxing: 'https://source.unsplash.com/600x400/?waxing,beauty',
  Color: 'https://source.unsplash.com/600x400/?hair,coloring',
  'Hair Coloring': 'https://source.unsplash.com/600x400/?hair,coloring',
};

const getImageForService = (service: Service, adminMap: Record<string, string[]>): string => {
  if (service.image && service.image.trim().length > 0) return service.image;
  const adminArr = adminMap[service.category];
  if (adminArr && adminArr.length > 0) return adminArr[0];
  const byCategory = categoryImageMap[service.category];
  if (byCategory) return byCategory;
  return 'https://source.unsplash.com/600x400/?beauty,salon';
};

const FeaturedServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get('http://localhost:5000/api/services/featured');
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
            Featured Services
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          Featured Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <img
                src={getImageForService(service, adminImages)}
                alt={service.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">{service.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                {service.description}
              </p>
              <div className="w-full">
                <div className="font-bold text-black dark:text-white text-lg mb-1">
                  ₦{service.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {service.duration} min
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
