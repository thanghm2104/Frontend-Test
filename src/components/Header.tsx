import React, { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const { currentLanguage, changeLanguage, pageContent, isLoading, error } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Show loading toast when content is loading
  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading content...', {
        id: 'content-loading',
      });
    } else {
      toast.dismiss('content-loading');
    }
  }, [isLoading]);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
      });
    }
  }, [error]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Generate correct path with language prefix
  const getLangPath = (path: string): string => {
    return `/${currentLanguage}${path === '/' ? '' : path}`;
  };
  
  // Toggle between EN and FR languages
  const toggleLanguage = async () => {
    if (isChangingLang) return; // Prevent multiple clicks while changing

    try {
      setIsChangingLang(true);
      const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
      const loadingToastId = toast.loading(
        `Changing to ${newLanguage.toUpperCase()}...`
      );

      await changeLanguage(newLanguage);
      
      toast.success(
        `Successfully changed to ${newLanguage.toUpperCase()}`,
        { id: loadingToastId }
      );
    } catch (error) {
      toast.error('Failed to change language. Please try again.');
      console.error('Error changing language:', error);
    } finally {
      setIsChangingLang(false);
    }
  };

  // Get menu items from API with fallback
  const menuItems = pageContent?.header?.menuItems || [
    { url: '/about', text: currentLanguage === 'en' ? 'About' : 'À propos' },
    { url: '/services', text: currentLanguage === 'en' ? 'Services' : 'Services' },
    { url: '/contact', text: currentLanguage === 'en' ? 'Contact' : 'Contact' }
  ];

  // Animation variants
  const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  };

  return (
    <header className="fixed top-0 left-0 w-full border-b border-[rgba(238,238,238,0.2)] bg-[rgba(86,44,44,0.7)] backdrop-blur-md z-50">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentLanguage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeInOut}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
        >
          <div className="flex justify-between items-center">
            {/* Left Section: Logo + Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <motion.a 
                href={getLangPath('/')} 
                className="text-white font-['Poppins'] text-base md:text-lg font-bold shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                POULOGO
              </motion.a>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-4 lg:space-x-8">
                  {menuItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a 
                        href={getLangPath(item.url)} 
                        className="text-white hover:text-primary transition-colors text-sm lg:text-base"
                      >
                        {item.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right Section: Controls */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Language Switcher - Desktop */}
              <motion.button 
                className={`hidden md:block text-white hover:text-primary transition-colors bg-transparent border border-white/20 rounded-full px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm shrink-0 ${
                  isChangingLang ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={toggleLanguage}
                disabled={isChangingLang}
                aria-label="Switch language"
                whileHover={!isChangingLang ? { scale: 1.05 } : {}}
                whileTap={!isChangingLang ? { scale: 0.95 } : {}}
              >
                <motion.span
                  key={currentLanguage}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                >
                  {currentLanguage === 'en' ? 'FR' : 'EN'}
                </motion.span>
              </motion.button>
              
              {/* Language Switcher - Mobile */}
              <button 
                className={`md:hidden text-white hover:text-primary transition-colors bg-transparent border border-white/20 rounded-full px-2 py-1 text-xs shrink-0 ${
                  isChangingLang ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={toggleLanguage}
                disabled={isChangingLang}
                aria-label="Switch language"
              >
                {currentLanguage === 'en' ? 'FR' : 'EN'}
              </button>
              
              {/* Social Media Icons - Desktop Only */}
              <div className="hidden md:flex items-center space-x-2 md:space-x-4 shrink-0">
                <Link to={getLangPath('/mountains')} className="text-white group transition-colors">
                  <img 
                    src="/public/icons/Mountains.svg" 
                    alt="Mountains" 
                    className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
                <Link to={getLangPath('/fishing')} className="text-white group transition-colors">
                  <img 
                    src="/public/icons/Fishing.svg" 
                    alt="Fishing" 
                    className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
                <Link to={getLangPath('/hunting')} className="text-white group transition-colors">
                  <img 
                    src="/public/icons/Crosshair.svg" 
                    alt="Hunting" 
                    className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
              </div>

              {/* Contact Button - Desktop Only */}
              <Link 
                to={getLangPath('/contact')} 
                className="hidden md:flex items-center relative w-8 md:w-10 h-8 md:h-10 bg-[#F2542D] rounded-full group transition-all duration-300 ease-in-out hover:w-[140px] md:hover:w-[160px] shrink-0"
              >
                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 md:pl-3 w-full">
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-white text-sm">
                    {currentLanguage === 'en' ? 'Contact Us' : 'Contactez-nous'}
                  </span>
                </div>
                <div className="absolute right-0 top-0 flex items-center justify-center w-8 md:w-10 h-8 md:h-10">
                  <img src="/public/icons/ArrowUpRight.svg" alt="Arrow" className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white focus:outline-none shrink-0"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
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
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10"
          >
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={getLangPath(item.url)} 
                    className="block text-white hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              
              {/* Mobile-only Social Media Icons */}
              <li className="pt-2 flex space-x-4">
                <Link to={getLangPath('/mountains')} className="text-white group transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <img 
                    src="/public/icons/Mountains.svg" 
                    alt="Mountains" 
                    className="h-5 w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
                <Link to={getLangPath('/fishing')} className="text-white group transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <img 
                    src="/public/icons/Fishing.svg" 
                    alt="Fishing" 
                    className="h-5 w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
                <Link to={getLangPath('/hunting')} className="text-white group transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <img 
                    src="/public/icons/Crosshair.svg" 
                    alt="Hunting" 
                    className="h-5 w-5 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]" 
                  />
                </Link>
              </li>
              
              {/* Mobile-only Contact Button */}
              <li className="pt-2">
                <Link 
                  to={getLangPath('/contact')}
                  className="inline-flex items-center text-white bg-[#F2542D] rounded-full px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">{currentLanguage === 'en' ? 'Contact Us' : 'Contactez-nous'}</span>
                  <img src="/public/icons/ArrowUpRight.svg" alt="Arrow" className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;