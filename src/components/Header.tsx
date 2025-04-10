import React, { useState } from 'react';
import useLanguage from '../hooks/useLanguage';

const Header: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Generate correct path with language prefix
  const getLangPath = (path: string): string => {
    return `/${currentLanguage}${path === '/' ? '' : path}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href={getLangPath('/')} className="text-white text-2xl font-bold tracking-wider">
              POURVOIRIE
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href={getLangPath('/')} className="text-white hover:text-primary transition-colors">
                  {currentLanguage === 'en' ? 'Home' : 'Accueil'}
                </a>
              </li>
              <li>
                <a href={getLangPath('/activities')} className="text-white hover:text-primary transition-colors">
                  {currentLanguage === 'en' ? 'Activities' : 'Activités'}
                </a>
              </li>
              <li>
                <a href={getLangPath('/contact')} className="text-white hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side controls - Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}
              className="px-3 py-1 border border-white/50 rounded-md text-white text-sm hover:bg-white/10 transition-colors"
            >
              {currentLanguage === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-fadeIn">
            <ul className="space-y-4">
              <li>
                <a 
                  href={getLangPath('/')} 
                  className="block text-white hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {currentLanguage === 'en' ? 'Home' : 'Accueil'}
                </a>
              </li>
              <li>
                <a 
                  href={getLangPath('/activities')} 
                  className="block text-white hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {currentLanguage === 'en' ? 'Activities' : 'Activités'}
                </a>
              </li>
              <li>
                <a 
                  href={getLangPath('/contact')} 
                  className="block text-white hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 