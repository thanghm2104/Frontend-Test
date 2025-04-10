import React from 'react';
import useLanguage from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { pageContent } = useLanguage();

  if (!pageContent) {
    return <div className="bg-gray-800 py-10"></div>;
  }

  const { address, phone, email, menuItems } = pageContent.footer;

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">Pourvoirie</span>
            </div>
            <address className="not-italic text-gray-300 mb-4">
              {address}
            </address>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300">
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span>{phone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {menuItems.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  className="text-gray-300 hover:text-white transition-colors py-1"
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter to get updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors"
              >
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Pourvoirie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 