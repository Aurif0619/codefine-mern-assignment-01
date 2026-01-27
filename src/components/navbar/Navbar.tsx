// Navbar component में props update کریں
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  cartItems: CartItem[];
  user: User | null;
  onLogout: () => void;
}

export const Navbar = ({
  cartItems = [],
  user = null,
  onLogout,
}: NavbarProps) => {
  
  const [isCartHovered, setIsCartHovered] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);



  // Check if user is authenticated
  const isAuthenticated = user !== null && user.isLoggedIn;

  return (
    <nav className="bg-gradient-to-r from-rose-600 to-red-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">C</span>
                </div>
                <h2 className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors duration-200">
                  Easy<span className="text-yellow-300">Shop</span>
                </h2>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-white hover:text-yellow-300 font-medium transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
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
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative">
                    <svg
                      className={`w-7 h-7 transition-all duration-200 ${isCartHovered ? "text-yellow-300" : "text-white"}`}
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
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-white font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </Link>

                {isCartHovered && cartCount > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-fadeIn">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                      <h4 className="font-bold text-lg text-gray-800">
                        Shopping Cart
                      </h4>
                      <span className="text-sm text-red-600 font-medium">
                        {cartCount} items
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {cartItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                        <p className="text-sm text-gray-500 text-center py-2">
                          +{cartItems.length - 3} more items
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-800">
                          Subtotal:
                        </span>
                        <span className="font-bold text-lg text-red-600">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        to="/cart"
                        className="block w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-center rounded-lg hover:from-red-700 hover:to-rose-700 transition-colors duration-200 font-medium"
                        onClick={() => setIsCartHovered(false)}
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}

                {isCartHovered && cartCount === 0 && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50 animate-fadeIn">
                    <div className="text-center py-4">
                      <svg
                        className="w-12 h-12 text-gray-300 mx-auto mb-3"
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
                      <p className="text-gray-600 font-medium">
                        Your cart is empty
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add some products to get started!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2 border-2 border-yellow-300 text-yellow-300 rounded-full hover:bg-yellow-300 hover:text-red-600 transition-all duration-300 font-medium">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-5 py-2 bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-full hover:from-red-800 hover:to-rose-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Code - same as before */}
          {/* ... */}
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  cartItems: [],
};