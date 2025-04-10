import React from 'react';
import { motion } from 'framer-motion';

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ title, subtitle, ctaText }) => {
  return (
    <div className="container mx-auto px-4 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md">
          {subtitle}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 sm:px-10 rounded-lg text-lg sm:text-xl transition-colors duration-300 shadow-lg w-full sm:w-auto"
        >
          {ctaText}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroContent; 