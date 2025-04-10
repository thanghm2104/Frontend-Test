import React from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

interface TestimonialCardProps {
  text: string;
  author: string;
  avatar?: string;
  hashtag: string;
  delay: number;
  inView: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  text, 
  author, 
  avatar, 
  hashtag, 
  delay, 
  inView 
}) => {
  return (
    <div 
      className={`
        bg-white p-6 rounded-lg shadow-lg 
        transition-all duration-700 delay-${delay} transform
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="mb-4">
        <svg className="h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <p className="text-gray-600 mb-4">{text}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
            {avatar ? (
              <img 
                src={avatar} 
                alt={author} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary text-white font-bold">
                {author.charAt(0)}
              </div>
            )}
          </div>
          <span className="font-medium">{author}</span>
        </div>
        
        <div className="text-sm text-primary font-medium">
          #{hashtag}
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!pageContent) {
    return <div className="py-20 bg-gray-50"></div>;
  }

  const { title, items } = pageContent.testimonials;

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <TestimonialCard
              key={item.id}
              text={item.text}
              author={item.author}
              avatar={item.avatar}
              hashtag={item.hashtag}
              delay={index * 100}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 