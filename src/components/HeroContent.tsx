import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const HeroContent: React.FC<HeroContentProps> = () => {
  const { pageContent, currentLanguage } = useLanguage();
  
  // Get banner menu items from API data
  const bannerMenuItems = pageContent?.banner_menu || [];
  
  return (
    <div className="container mx-auto px-4 text-center text-white">
      <div className="flex justify-center items-center gap-[320px] mt-16">
        {bannerMenuItems.map((item: string, index: number) => (
          <Link 
            key={index}
            to={`/${currentLanguage}/${item.toLowerCase().replace(/\s+/g, '-')}`} 
            className="text-white"
          >
            <div className="text-center">
              {index === 0 && (
                <img src="/public/icons/Mountains.svg" alt="Mountains" className="w-7 h-7 mx-auto mb-2" />
              )}
              {index === 1 && (
                <img src="/public/icons/Fishing.svg" alt="Fishing" className="w-7 h-7 mx-auto mb-2" />
              )}
              {index === 2 && (
              <img src="/public/icons/Crosshair.svg" alt="Hunting" className="w-7 h-7 mx-auto mb-2" />
              )}
              <span className="text-sm md:hidden">{item}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroContent; 