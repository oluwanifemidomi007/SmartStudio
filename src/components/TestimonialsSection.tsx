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

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials/featured');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([
          {
            id: 1,
            name: 'Jane Doe',
            service: 'Haircut',
            message:
              'Absolutely loved my new look! The staff is amazing and the service was exceptional.',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            featured: true,
          },
          {
            id: 2,
            name: 'Emily Smith',
            service: 'Manicure',
            message:
              "Best manicure I've ever had. Highly recommend! The attention to detail is incredible.",
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            featured: true,
          },
          {
            id: 3,
            name: 'Sarah Lee',
            service: 'Facial',
            message:
              'My skin feels so refreshed. Will come back for sure. The facial treatment was amazing!',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            featured: true,
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
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
            What Our Clients Say
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 object-cover rounded-full mb-4 border-4 border-primary"
              />
              <p className="italic text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                "{testimonial.message}"
              </p>
              <div className="w-full">
                <div className="font-bold text-primary text-lg">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
