import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type OutletContextType = {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
};

export default function Cart() {
  const { cartItems, removeFromCart, updateCartQuantity } =
    useOutletContext<OutletContextType>();

  const [localQuantities, setLocalQuantities] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setLocalQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setLocalQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));

    if (updateCartQuantity) {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  const incrementQuantity = (itemId: number) => {
    const currentQty = localQuantities[itemId] || 1;
    handleQuantityChange(itemId, currentQty + 1);
  };

  const decrementQuantity = (itemId: number) => {
    const currentQty = localQuantities[itemId] || 1;
    if (currentQty > 1) {
      handleQuantityChange(itemId, currentQty - 1);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const quantity = localQuantities[item.id] || 1;
    return sum + item.price * quantity;
  }, 0);

  const totalItemsCount = cartItems.reduce((sum, item) => {
    return sum + (localQuantities[item.id] || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-r from-rose-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">Add some products to your cart</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              {cartItems.map((item) => {
                const quantity = localQuantities[item.id] || 1;
                const itemTotal = item.price * quantity;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center p-6 border-b border-rose-100 hover:bg-rose-50 transition-colors group"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-rose-50 to-red-50 rounded-xl overflow-hidden flex-shrink-0 shadow-sm mb-4 md:mb-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="ml-0 md:ml-6 flex-grow text-center md:text-left mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-rose-700">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="flex items-center bg-gradient-to-r from-rose-50 to-red-50 rounded-full shadow-sm">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100 rounded-l-full transition-colors"
                          disabled={quantity <= 1}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>

                        <span className="px-4 py-2 text-lg font-bold text-gray-800 min-w-[50px] text-center">
                          {quantity}
                        </span>

                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100 rounded-r-full transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
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
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          ${itemTotal.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-0 md:ml-4 p-3 bg-gradient-to-r from-rose-50 to-red-50 text-rose-600 hover:text-rose-700 rounded-full hover:from-rose-100 hover:to-red-100 transition-all duration-200 shadow-sm hover:shadow-md"
                      title="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-rose-100">
                <div>
                  <span className="text-xl font-medium text-gray-700">
                    Total Items
                  </span>
                  <p className="text-sm text-gray-500">
                    {totalItemsCount}{" "}
                    {totalItemsCount === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                    ${cartTotal.toFixed(2)}
                  </span>
                  <p className="text-sm text-gray-500">including all taxes</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6">
                <Link
                  to="/"
                  className="px-8 py-3 border-2 border-rose-200 text-rose-600 font-medium rounded-full hover:bg-rose-50 hover:border-rose-300 transition-colors text-center shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </div>
                </Link>

                <Link
                  to="/checkout"
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Proceed to Checkout
                  </div>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-rose-100">
                <div className="flex items-center justify-center text-gray-600 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Secure SSL encrypted payment • 100% Protected</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
