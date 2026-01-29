import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  token: string;
}

interface NavbarProps {
  cartItems?: CartItem[];
  user?: User | null;
  onLogout?: () => void;
}

export const Navbar = ({
  cartItems = [],
  user = null,
  onLogout,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navLinks = [
    { 
      label: "Home", 
      href: "/",
      icon: "🏠"
    },
    { 
      label: "Products", 
      href: "/",
      icon: "📦"
    },
    { 
      label: "About", 
      href: "/",
      icon: "ℹ️"
    },
    { 
      label: "Contact", 
      href: "/checkout",
      icon: "📞"
    },
  ];

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsMenuOpen(false);
  };

  const isAuthenticated = user?.isLoggedIn || false;
  const userName = user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="bg-gradient-to-r from-rose-600 to-red-600 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <div className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">E</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300 relative">
                  Easy<span className="text-yellow-300">Shop</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                </h2>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with Animated Dots */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative px-6 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    isActive 
                      ? "bg-white/20 text-white shadow-lg" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  onMouseEnter={() => setActiveLink(link.href)}
                >
                  {/* Animated Background Dots */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-1 right-2 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-1 left-2 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-1 right-2 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                  </div>

                  <div className="relative flex items-center space-x-2">
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>

                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 group-hover:w-4/5 transition-all duration-300 ${isActive ? 'w-4/5' : ''}`}></div>

                  {/* Floating Particles on Hover */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-3 right-6 w-1 h-1 bg-blue-300 rounded-full animate-float" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-2 left-6 w-1 h-1 bg-green-300 rounded-full animate-float" style={{ animationDelay: '0.6s' }}></div>
                    <div className="absolute bottom-3 right-4 w-1 h-1 bg-purple-300 rounded-full animate-float" style={{ animationDelay: '0.9s' }}></div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <div
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
                className="relative"
              >
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="relative">
                    {/* Animated Cart Icon */}
                    <div className="relative">
                      <svg
                        className={`w-7 h-7 transition-all duration-200 ${isCartHovered ? "text-yellow-300 scale-110" : "text-white"}`}
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
                      
                      {/* Small floating dots around cart */}
                      <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    </div>

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-white font-medium group-hover:text-yellow-300 transition-colors duration-200">
                    ${cartTotal.toFixed(2)}
                  </span>
                </Link>

                {/* Cart Dropdown */}
                {isCartHovered && cartCount > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-scale-in">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                      <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                        <span>🛒</span>
                        <span>Shopping Cart</span>
                      </h4>
                      <span className="text-sm text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                        {cartCount} items
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {cartItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className="ml-3 flex-grow">
                            <h5 className="text-sm font-medium text-gray-800 truncate">
                              {item.title}
                            </h5>
                            <p className="text-red-600 font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}

                      {cartItems.length > 3 && (
                        <div className="text-center py-2">
                          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 ml-1">
                              +{cartItems.length - 3} more
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-800">
                          Subtotal:
                        </span>
                        <span className="font-bold text-lg text-red-600 bg-red-50 px-3 py-1 rounded-full">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        to="/cart"
                        className="block w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-center rounded-lg hover:from-red-700 hover:to-rose-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        onClick={() => setIsCartHovered(false)}
                      >
                        View Cart 🚀
                      </Link>
                    </div>
                  </div>
                )}

                {isCartHovered && cartCount === 0 && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50 animate-scale-in">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        Your cart feels lonely! 🛒
                      </p>
                      <p className="text-sm text-gray-500">
                        Add some amazing products!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <button className="relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">Login ✨</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="relative px-6 py-2.5 border-2 border-yellow-300 text-yellow-300 rounded-full hover:bg-yellow-300 hover:text-red-600 transition-all duration-300 font-medium overflow-hidden group">
                    <div className="absolute inset-0 bg-yellow-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <span className="relative">Signup 🌟</span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{userInitial}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
                  <div className="absolute opacity-0 group-hover:opacity-100 -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded mt-2 whitespace-nowrap transition-opacity duration-200">
                    Hello, {userName}!
                  </div>
                </div>
                <button
                  className="relative px-6 py-2.5 bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-full hover:from-red-800 hover:to-rose-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl overflow-hidden group"
                  onClick={handleLogout}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-2">
                    <span>Logout</span>
                    <span className="group-hover:rotate-180 transition-transform duration-300">🚪</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="relative">
              <Link to="/cart" className="relative p-2 group">
                <div className="relative">
                  <svg
                    className="w-7 h-7 text-white group-hover:text-yellow-300 transition-colors duration-200"
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
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-md">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></div>
                <div className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-2xl mt-2 p-4 border border-gray-200 animate-scale-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-600 border border-red-100' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                    {isActive && (
                      <div className="ml-auto flex space-x-1">
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </Link>
                );
              })}

              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 mt-2 border border-red-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🛒</span>
                    <span className="font-bold text-gray-800">Your Cart</span>
                  </div>
                  <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {cartCount} items
                  </span>
                </div>

                {cartCount > 0 && (
                  <div className="mb-3 max-h-40 overflow-y-auto space-y-2">
                    {cartItems.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-0.5"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <p className="text-xs font-medium text-gray-800 truncate">
                            {item.title}
                          </p>
                          <p className="text-red-600 font-bold text-sm">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {cartItems.length > 2 && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          +{cartItems.length - 2} more items
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="font-bold text-lg text-red-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/cart"
                  className="block w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white text-center rounded-lg hover:from-red-700 hover:to-rose-700 transition-colors duration-200 font-medium shadow-lg flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>View Cart</span>
                  <span>🚀</span>
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-colors duration-200 font-medium shadow-lg flex items-center justify-center space-x-2">
                        <span>Login</span>
                        <span>✨</span>
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                        <span>Signup</span>
                        <span>🌟</span>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold">{userInitial}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Welcome back,</p>
                        <p className="font-medium text-gray-800">{userName}</p>
                      </div>
                    </div>
                    <button
                      className="w-full py-3 bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-lg hover:from-red-800 hover:to-rose-800 transition-colors duration-200 font-medium shadow-lg flex items-center justify-center space-x-2"
                      onClick={handleLogout}
                    >
                      <span>Logout</span>
                      <span>🚪</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  cartItems: [],
  user: null,
  onLogout: () => {},
};