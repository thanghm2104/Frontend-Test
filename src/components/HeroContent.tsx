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
      <div className="flex justify-center items-center border-t-[1px] border-white-500 ">
        {bannerMenuItems.map((item: string, index: number) => (
          <Link 
            key={index}
            to={`/${currentLanguage}/${item.toLowerCase().replace(/\s+/g, '-')}`} 
            className="text-white border-t-[2px] border-transparent hover:border-white flex-1 pt-4"
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
              <span className="text-lg font-[600] opacity-0 translate-y-4 transition-transform duration-300 group-hover:opacity-100 group-hover:translate-y-0">{item}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroContent; 