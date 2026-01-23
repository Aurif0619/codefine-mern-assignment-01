import React, { useState } from 'react';

export const Navbar = ({ isAuthenticated = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
              MyStore
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button 
                  className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200 font-medium"
                >
                  Login
                </button>
                <button 
                  className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition-colors duration-200 font-medium"
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, User!</span>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <button 
                className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 text-sm"
              >
                Logout
              </button>
            )}
            <button 
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 p-1 rounded"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 hover:text-yellow-500 font-medium py-2 px-4 hover:bg-yellow-50 rounded transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <button 
                    className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </button>
                  <button 
                    className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 px-4 py-2">Welcome, User!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};