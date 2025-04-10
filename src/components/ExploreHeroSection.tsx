import React from 'react';

const ExploreHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/public/images/explore.png" 
          alt="Fresh fruits and food items"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          <span className="text-brown-800">Explorez Avec BASIC</span>
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-400 mb-8">
          Dès Aujourd'hui
        </h2>
        
        
        <div className="max-w-xl text-center">
          <p className="text-[#562C2C] text-center font-poppins text-[24px] font-normal leading-normal mb-10">
            Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry. Lorem Ipsum has been the 
            industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          Explorer
        </button>
      </div>
    </section>
  );
};

export default ExploreHeroSection;