import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type OutletContextType = {
  addToCart: (product: Product) => void;
  cartItems: { id: number }[];
};

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products'); 
        const data: Product[] = await response.json(); 
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    
    const button = document.getElementById(`cart-btn-${product.id}`);
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => {
        button.classList.remove('scale-95');
      }, 200);
    }
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        <span className="ml-4 text-gray-600">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our amazing collection of premium products with the best prices
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium">
            {cartItems.length} items in cart
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
 
              <span className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                {product.category}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                {product.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-yellow-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </div>

              <div className="flex flex-col space-y-3">
                {isInCart(product.id) ? (
                  <button
                    className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition-all duration-200 flex items-center justify-center group"
                  >
                    <svg 
                      className="w-5 h-5 mr-2 group-hover:animate-bounce" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Already in Cart
                  </button>
                ) : (
                  <button
                    id={`cart-btn-${product.id}`}
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center group"
                  >
                    <svg 
                      className="w-5 h-5 mr-2 group-hover:animate-bounce" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                )}
                
                <button className="w-full py-2 text-gray-600 hover:text-yellow-600 font-medium text-sm transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Quick View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <a 
            href="/cart"
            className="bg-white rounded-full shadow-2xl p-4 flex items-center space-x-3 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-800">{cartItems.length} items</p>
              <p className="text-sm text-gray-600">View Cart</p>
            </div>
          </a>
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try refreshing the page</p>
        </div>
      )}
    </div>
  );
}