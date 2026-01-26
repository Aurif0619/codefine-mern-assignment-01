import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

type OutletContextType = {
  addToCart: (product: { id: number; title: string; price: number; image: string }) => void;
  cartItems: { id: number }[];
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const context = useOutletContext() as OutletContextType;
  const addToCart = context?.addToCart;
  const cartItems = context?.cartItems || [];

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data: Product = await response.json();
        setProduct(data);
        setSelectedImage(data.image);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && addToCart) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
    }
  };

  const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-[400px] bg-gray-200 rounded-xl"></div>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 w-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              
              {/* Details Skeleton */}
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/" className="hover:text-yellow-500 transition-colors">
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="h-[400px] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="flex space-x-4 overflow-x-auto py-2">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === product.image ? 'border-yellow-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={product.image}
                  alt="Main"
                  className="w-full h-full object-contain p-1"
                />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-yellow-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                In Stock
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

          
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Category</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Rating</span>
                <p className="font-medium">{product.rating.rate}/5</p>
              </div>
            </div>

            <div className="space-y-4">
              {isInCart ? (
                <div className="space-y-3">
                  <button className="w-full py-4 bg-green-50 text-green-700 border-2 border-green-200 rounded-xl font-medium hover:bg-green-100 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Already in Cart
                  </button>
                  <Link
                    to="/cart"
                    className="block w-full py-3 text-center bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart - ${product.price.toFixed(2)}
                </button>
              )}
              
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Products
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mt-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7m-6 6l-7 7m0 0l7-7m-7 7V6" />
                </svg>
                <div>
                  <p className="font-medium text-blue-800">Free Shipping</p>
                  <p className="text-sm text-blue-600">Order today, ships within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
          <p className="text-gray-500">Browse more products in our collection</p>
        </div>
      </div>
    </div>
  );
}