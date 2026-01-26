import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Confetti from "react-confetti";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type OutletContextType = {
  addToCart: (product: {
    id: number;
    title: string;
    price: number;
    image: string;
  }) => void;
  cartItems: { id: number; title: string; price: number; image: string }[];
  removeFromCart: (id: number) => void;
};

const fallbackImages: Record<number, string> = {
  };

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const context = useOutletContext() as OutletContextType;
  const addToCart = context?.addToCart;
  const cartItems = context?.cartItems || [];
  const removeFromCart = context?.removeFromCart;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productId: number) => {
    const img = e.target as HTMLImageElement;
    img.src = fallbackImages[productId] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching products...");
        
        const apiUrls = [
          "https://fakestoreapi.com/products", ];
        
        let success = false;
        
        for (const url of apiUrls) {
          try {
            console.log(`Trying API: ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
              console.log(`API ${url} failed: ${response.status}`);
              continue;
            }
            
            const data = await response.json();
            
            // Different APIs have different response structures
            let productsData: Product[] = [];
            
            if (url.includes("fakestoreapi.com")) {
              productsData = data;
            } else if (url.includes("escuelajs.co")) {
              productsData = data.slice(0, 8).map((item: any) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.images?.[0] || fallbackImages[item.id] || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: item.description,
                category: item.category?.name || "General"
              }));
            } else if (url.includes("dummyjson.com")) {
              productsData = data.products.slice(0, 8).map((item: any) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.thumbnail || fallbackImages[item.id],
                description: item.description,
                category: item.category || "General"
              }));
            }
            
            if (productsData.length > 0) {
              setProducts(productsData);
              console.log(`Successfully loaded ${productsData.length} products from ${url}`);
              success = true;
              break;
            }
          } catch (err) {
            console.log(`Error with API ${url}:`, err);
          }
        }
        
        if (!success) {
          // Use fallback hardcoded products
          console.log("Using fallback products");
          setProducts([
            {
              id: 1,
              title: "Premium Backpack",
              price: 49.99,
              image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "High-quality backpack for everyday use",
              category: "Accessories"
            },
            {
              id: 2,
              title: "Casual T-Shirt",
              price: 24.99,
              image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Comfortable cotton t-shirt",
              category: "Clothing"
            },
            {
              id: 3,
              title: "Smart Watch",
              price: 199.99,
              image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Latest smart watch with fitness tracking",
              category: "Electronics"
            },
            {
              id: 4,
              title: "Stylish Jacket ",
              price: 14.99,
              image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Ceramic coffee mug with handle",
              category: "Home"
            },
            {
              id: 5,
              title: "Clothes",
              price: 89.99,
              image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Comfortable running shoes",
              category: "Clothes"
            },
            {
              id: 6,
              title: "T Shirt",
              price: 129.99,
              image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Noise cancelling wireless headphones",
              category: "Clothes"
            },
            {
              id: 7,
              title: "Leather Wallet",
              price: 39.99,
              image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "Genuine leather wallet",
              category: "Accessories"
            },
            {
              id: 8,
              title: "Desk Lamp",
              price: 34.99,
              image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              description: "LED desk lamp with adjustable brightness",
              category: "Home"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    };

    if (addToCart) {
      addToCart(cartProduct);
      setAddedProductId(product.id);
      setShowConfetti(true);

      // Show celebration for 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      setTimeout(() => {
        setAddedProductId(null);
      }, 3500);
    }

    const button = document.getElementById(`cart-btn-${product.id}`);
    if (button) {
      button.classList.add("scale-95");
      setTimeout(() => {
        button.classList.remove("scale-95");
      }, 200);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    if (removeFromCart) {
      removeFromCart(productId);
    }
  };

  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.id === productId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl h-64"></div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gradient-to-r from-rose-100 to-red-100 rounded"></div>
                <div className="h-4 bg-gradient-to-r from-rose-100 to-red-100 rounded w-2/3"></div>
                <div className="h-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={150}
            gravity={0.1}
            colors={['#FF6B8B', '#FF8E53', '#FFCE00', '#36D1DC', '#5B86E5']}
          />
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-xl animate-bounce z-50">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold">Added to Cart! 🎉</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
            Featured Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our amazing collection of premium products with the best prices
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-full font-medium shadow-sm">
              {cartItems.length} items in cart
            </span>
            {cartItems.length > 0 && (
              <Link
                to="/cart"
                className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full hover:from-rose-600 hover:to-red-600 transition-colors shadow-md"
              >
                View Cart
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-rose-100 relative ${
                addedProductId === product.id
                  ? "ring-2 ring-yellow-400 ring-offset-2 animate-pulse"
                  : ""
              }`} >

              {addedProductId === product.id && (
                <div className="absolute top-2 right-2 z-10 animate-bounce">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Added!
                  </div>
                </div>
              )}

              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-rose-50 to-red-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => handleImageError(e, product.id)}
                  loading="lazy"
                />

                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-bold rounded-full shadow-md">
                  {product.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14 group-hover:text-rose-700 transition-colors">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-medium px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                <div className="flex flex-col space-y-3">
                  {isInCart(product.id) ? (
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="w-full py-3 bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border border-rose-200 rounded-lg font-medium hover:from-rose-100 hover:to-red-100 hover:text-rose-800 transition-all duration-200 flex items-center justify-center group shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-5 h-5 mr-2 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      id={`cart-btn-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group relative overflow-hidden"
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      <svg
                        className="w-5 h-5 mr-2 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  )}

                  <Link
                    to={`/product/${product.id}`}
                    className="w-full py-2.5 text-gray-600 hover:text-rose-600 font-medium text-sm transition-colors flex items-center justify-center hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 rounded-lg group border border-transparent hover:border-rose-100"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Quick View
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-transparent to-red-500/0 group-hover:from-rose-500/5 group-hover:to-red-500/5 transition-all duration-300 pointer-events-none rounded-xl"></div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
            <Link
              to="/cart"
              className="bg-gradient-to-r from-rose-600 to-red-600 rounded-full shadow-2xl p-4 flex items-center space-x-3 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
            >
              <div className="relative">
                <svg
                  className="w-8 h-8 text-white"
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
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-rose-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              </div>
              <div>
                <p className="font-bold text-white">{cartItems.length} items</p>
                <p className="text-sm text-white/80 group-hover:text-white">
                  View Cart
                </p>
              </div>
              <svg
                className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}

        {addedProductId && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 backdrop-blur-sm">
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-bold">Added to Cart!</p>
                <p className="text-sm opacity-90">
                  Check your cart in the navbar
                </p>
              </div>
            </div>
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-rose-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-rose-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">Try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full hover:from-rose-600 hover:to-red-600 transition-colors shadow-md hover:shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}