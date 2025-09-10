import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  message: string;
  avatar: string;
  featured: boolean;
}

const nigerianAvatars = [
  'https://images.generated.photos/ng-1.jpg',
  'https://images.generated.photos/ng-2.jpg',
  'https://images.generated.photos/ng-3.jpg',
  'https://images.generated.photos/ng-4.jpg',
  'https://images.generated.photos/ng-5.jpg',
  'https://images.generated.photos/ng-6.jpg',
];

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([
          {
            id: 1,
            name: 'Adaobi Okafor',
            service: 'Haircut',
            message:
              'Absolutely loved my new look! The staff is amazing and the service was exceptional.',
            avatar: nigerianAvatars[0],
            featured: true,
          },
          {
            id: 2,
            name: 'Aisha Bello',
            service: 'Manicure',
            message:
              "Best manicure I've ever had. Highly recommend! The attention to detail is incredible.",
            avatar: nigerianAvatars[1],
            featured: true,
          },
          {
            id: 3,
            name: 'Chinwe Nwosu',
            service: 'Facial',
            message: 'My skin feels so refreshed. The facial treatment was amazing!',
            avatar: nigerianAvatars[2],
            featured: true,
          },
          {
            id: 4,
            name: 'Kemi Adeyemi',
            service: 'Hair Coloring',
            message: 'Amazing hair coloring service! The results exceeded my expectations.',
            avatar: nigerianAvatars[3],
            featured: false,
          },
          {
            id: 5,
            name: 'Ngozi Eze',
            service: 'Pedicure',
            message: 'Relaxing and professional pedicure service. The salon is clean and friendly.',
            avatar: nigerianAvatars[4],
            featured: false,
          },
          {
            id: 6,
            name: 'Yemi Ojo',
            service: 'Waxing',
            message: 'Professional and painless waxing service. I felt very comfortable.',
            avatar: nigerianAvatars[5],
            featured: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
            Client Testimonials
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
          Client Testimonials
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Read what our valued clients have to say about their experiences at BeautyPhantom.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 object-cover rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.service}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.message}"</p>
              {testimonial.featured && (
                <div className="mt-4">
                  <span className="bg-primary text-black px-2 py-1 rounded-full text-xs font-semibold">
                    Featured Review
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
