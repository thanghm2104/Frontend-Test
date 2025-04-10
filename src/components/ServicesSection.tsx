import React from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

const ServicesSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!pageContent) {
    return <div className="py-20 bg-gray-50"></div>;
  }

  const { title, subtitle, items } = pageContent.services;

  return (
    <section ref={ref} className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 delay-${index * 150} transform ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="bg-primary-light bg-opacity-10 px-4 py-2 rounded-md inline-block text-primary font-medium">
                  {item.packageName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 