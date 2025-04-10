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

  const { title, subtitle, ctaText } = pageContent.hero;

  return (
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="relative z-10 h-full flex items-center justify-center">
        <HeroContent
          title={title}
          subtitle={subtitle}
          ctaText={ctaText}
        />
      </div>
    </section>
  );
};

export default HeroSection; 