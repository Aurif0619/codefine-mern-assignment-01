
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ isAuthenticated = false, cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [cartCount ] = useState(0);
  const [cartTotal] = useState(0);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0">
            <Link to="/">
              <h2 className="text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-200">
                Codefine API Web 
              </h2>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href} 
                className="relative text-gray-700 hover:text-yellow-500 font-medium transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="relative">
                  <svg 
                    className={`w-6 h-6 transition-all duration-200 ${isCartHovered ? 'text-yellow-500' : 'text-gray-700'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                
                {isCartHovered && cartCount > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50 animate-fadeIn">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                      <h4 className="font-bold text-lg text-gray-800">Your Shopping Cart</h4>
                      <span className="text-sm text-yellow-500 font-medium">{cartCount} items</span>
                    </div>
                    
                  
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">Subtotal:</span>
                        <span className="font-bold text-lg text-yellow-600">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Link 
                        to="/cart"
                        className="flex-1 py-2.5 bg-yellow-500 text-white text-center rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
                        onClick={() => setIsCartHovered(false)}
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}
              </button>
              
              {isCartHovered && cartCount === 0 && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-50 animate-fadeIn">
                  <div className="text-center py-4">
                   <a href="../cart"> 
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg></a>
                    <p className="text-gray-600 font-medium">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mt-1">Add some products to get started!</p>
                  </div>
                </div> 
              )}
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/auth/login">
                  <button 
                    className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/auth/signup">
                  <button 
                    className="px-5 py-2 border-2 border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 font-medium"
                  >
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <span className="text-gray-700 font-medium">Welcome, User!</span>
                <button 
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <div className="relative">
              <Link to="/cart">
                <div className="relative p-2">
                  <svg 
                    className="w-6 h-6 text-gray-700"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <button 
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 p-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-700 hover:text-yellow-500 font-medium py-3 px-4 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-800">Cart Items:</span>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
                    {cartCount} items
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Total: <span className="font-bold text-yellow-600">${cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/cart"
                  className="block w-full mt-2 py-3 bg-yellow-500 text-white text-center rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}>
                  View Cart
                </Link>
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <Link to="/auth/login">
                    <button 
                      className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/auth/signup">
                    <button 
                      className="w-full px-4 py-3 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Signup
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <p className="text-gray-700 px-4 py-2 font-medium">Welcome, User!</p>
                  <button 
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  cartItems: [],
};
