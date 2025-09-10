import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        'service_h2rm2ur', // replace with your EmailJS service ID
        'template_xxxxxx', // replace with your EmailJS template ID
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        'erbffyU9YJY34HZ45' // replace with your EmailJS public key
      );

      console.log('SUCCESS!', result.status, result.text);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('FAILED...', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Contact Us
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-primary/20 via-white to-primary/10 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>

              <h2 className="text-3xl font-extrabold text-primary mb-4">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We’d love to hear from you! Reach out to us through any of the channels below.
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-black text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Beauty Street
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-black text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">(555) 123-4567</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-black text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@beautyphantom.com</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-black text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black dark:text-white">Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Mon – Fri: 9:00 AM – 8:00 PM
                      <br />
                      Sat: 9:00 AM – 6:00 PM
                      <br />
                      Sun: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-3 text-primary font-bold">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  {FaInstagram({}) as any}
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  {FaFacebookF({}) as any}
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  {FaTwitter({}) as any}
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  {FaTiktok({}) as any}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p className="font-bold">Message Sent!</p>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-black py-3 px-6 rounded-md font-semibold hover:bg-black hover:text-primary transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
