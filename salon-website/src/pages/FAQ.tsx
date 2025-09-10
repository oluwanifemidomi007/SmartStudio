import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'What services do you offer?',
      answer:
        'We offer a comprehensive range of beauty services including haircuts, styling, coloring, manicures, pedicures, facials, waxing, and more. Check our Services page for a complete list.',
    },
    {
      id: 2,
      question: 'How do I book an appointment?',
      answer:
        'You can book an appointment through our online booking system, by calling us at (555) 123-4567, or by visiting our salon in person. We recommend booking in advance, especially for popular services.',
    },
    {
      id: 3,
      question: 'What is your cancellation policy?',
      answer:
        'We require 24 hours notice for cancellations. Late cancellations or no-shows may be charged a fee. We understand emergencies happen, so please call us as soon as possible if you need to reschedule.',
    },
    {
      id: 4,
      question: 'Do you accept walk-ins?',
      answer:
        'Yes, we do accept walk-ins based on availability. However, we highly recommend booking an appointment to ensure you get the time slot and stylist you prefer.',
    },
    {
      id: 5,
      question: 'What forms of payment do you accept?',
      answer:
        'We accept cash, credit cards, debit cards, and digital payments. We also offer gift cards which make perfect presents for friends and family.',
    },
    {
      id: 6,
      question: 'How long do services typically take?',
      answer:
        "Service duration varies depending on the treatment. A basic haircut takes about 45 minutes, while a full color service can take 2-3 hours. We'll provide an estimated time when you book.",
    },
    {
      id: 7,
      question: 'Do you offer gift cards?',
      answer:
        'Yes! Gift cards are available in any denomination and can be used for any of our services. They make perfect gifts for birthdays, holidays, or just because.',
    },
    {
      id: 8,
      question: 'What are your operating hours?',
      answer:
        "We're open Monday-Friday 9:00 AM - 8:00 PM, Saturday 9:00 AM - 6:00 PM, and Sunday 10:00 AM - 4:00 PM. We're closed on major holidays.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Find answers to common questions about our services, policies, and procedures.
        </p>

        <div className="max-w-3xl mx-auto">
          {faqItems.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-4 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {item.question}
                </h3>
                <span
                  className={`text-primary text-2xl transition-transform ${
                    openItems.includes(item.id) ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Contact us directly and we'll be happy to help!
          </p>
          <a
            href="/contact"
            className="bg-primary text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-primary transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
