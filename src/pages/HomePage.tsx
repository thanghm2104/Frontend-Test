import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AdventureSection from '../components/AdventureSection';
import useLanguage from '../hooks/useLanguage';
import useRouteLanguage from '../hooks/useRouteLanguage';

const HomePage: React.FC = () => {
  // Get language from route and synchronize it
  useRouteLanguage(); // This hook has side effects, so we call it even if we don't use the return value
  const { isLoading, error, pageContent } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center px-4 bg-gray-900">
        <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Content</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pageContent) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AdventureSection />
    </div>
  );
};

export default HomePage; 