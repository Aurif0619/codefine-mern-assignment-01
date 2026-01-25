import { Link } from "react-router-dom";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type OutletContextType = {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
};

export default function Cart() {
  const { cartItems, removeFromCart } = useOutletContext<OutletContextType>();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to your cart</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-100 hover:bg-gray-50">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-yellow-600 font-bold text-xl">${item.price.toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-medium text-gray-700">Total</span>
              <span className="text-3xl font-bold text-yellow-600">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <Link 
                to="/" 
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
              <button className="px-8 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors shadow-md">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}