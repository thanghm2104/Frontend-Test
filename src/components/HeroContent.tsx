import React from 'react';
import { Link } from 'react-router-dom';

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const HeroContent: React.FC<HeroContentProps> = () => {
  return (
    <div className="container mx-auto px-4 text-center text-white">
      <div className="flex justify-center items-center gap-[320px]">
        <Link to="/mountains" className="text-white">
          <img src="/public/icons/Mountains.svg" alt="Mountains" className="w-7 h-7" />
        </Link>
        <Link to="/fishing" className="text-white">
          <img src="/public/icons/Fishing.svg" alt="Fishing" className="w-7 h-7" />
        </Link>
        <Link to="/hunting" className="text-white">
          <img src="/public/icons/Crosshair.svg" alt="Crosshair" className="w-7 h-7" />
        </Link>
      </div>
    </div>
  );
};

export default HeroContent; 