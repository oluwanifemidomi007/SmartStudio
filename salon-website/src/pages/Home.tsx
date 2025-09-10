import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedServices from '../components/FeaturedServices';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Steps from '../components/Steps';
import BrandsMarquee from '../components/BrandsMarquee';
import CTASection from '../components/CTASection';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <WhyChooseUs />
      <FeaturedServices />
      <Steps />
      <TestimonialsSection />
      <BrandsMarquee />
      <CTASection />
    </div>
  );
};

export default Home;
