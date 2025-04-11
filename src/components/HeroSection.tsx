import React, { useRef, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import HeroContent from './HeroContent';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
}

const HeroSection: React.FC = () => {
  const { pageContent, currentLanguage } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Path to video based on language
  const getVideoPath = () => {
    // You can use different videos for different languages if needed
    return "/video.mp4";
  };

  useEffect(() => {
    // Ensure video plays when language changes or component mounts
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video source
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [currentLanguage]);

  if (!pageContent) {
    return <div className="h-screen bg-gray-900"></div>;
  }


  return (
    <section className="relative h-screen  overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src={getVideoPath()} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex justify-center items-end">
        <HeroContent
        />
      </div>
      <div className="hidden md:absolute bottom-[80px] right-[148px] z-10">
        <button className="flex items-center justify-center w-[56px] h-[56px] p-3 gap-2 rounded-[222px] bg-[#F2542D]">
          <img src="/public/icons/Chats.svg" alt="Chatbot" className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 