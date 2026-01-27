import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type OutletContextType = {
  cartItems: CartItem[];
  clearCart: () => void;
};

export const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Pakistan",
    paymentMethod: "credit-card",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const context = useOutletContext() as OutletContextType;
  const cartItems = context?.cartItems || [];
  const clearCart = context?.clearCart;

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const taxAmount = cartTotal * 0.05;
  const grandTotal = cartTotal + shippingCost + taxAmount;

  const generateOrderNumber = () => {
    return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      setOrderSuccess(true);
      setIsProcessing(false);

      if (clearCart) {
        clearCart();
      }

      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 2000);
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-rose-400"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to proceed to checkout
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-500"
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
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-6 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 mb-2">Order Number</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                {orderNumber}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Order Total</span>
              <span className="text-xl font-bold text-gray-800">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-800 capitalize">
                {formData.paymentMethod.replace("-", " ")}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-medium text-green-600">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </Link>
            <p className="text-sm text-gray-500">
              You will be redirected to home page in 5 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your purchase in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-rose-100">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter street address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.zipCode ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-rose-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Payment Method
                  </h3>

                  <div className="space-y-4">
                    {["credit-card", "paypal", "cash-on-delivery"].map(
                      (method) => (
                        <label
                          key={method}
                          className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                          />
                          <div className="ml-4">
                            <span className="font-medium text-gray-800 capitalize">
                              {method.replace("-", " ")}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              {method === "credit-card" &&
                                "Pay with your credit or debit card"}
                              {method === "paypal" &&
                                "Pay securely with your PayPal account"}
                              {method === "cash-on-delivery" &&
                                "Pay when your order arrives"}
                            </p>
                          </div>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-rose-100">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center ${isProcessing ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing Order...
                      </>
                    ) : (
                      <>
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
                        Place Order - ${grandTotal.toFixed(2)}
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-rose-100">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-red-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-rose-600 font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span
                    className={`font-medium ${shippingCost === 0 ? "text-green-600" : ""}`}
                  >
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-b border-rose-100">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-red-500 text-white font-medium rounded-r-lg hover:bg-red-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-rose-100">
                <div className="flex items-center text-gray-600 text-sm">
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
                  <span>100% Secure Payment</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your payment information is encrypted and secure.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to="/cart"
                  className="block text-center py-3 border-2 border-rose-200 text-rose-600 font-medium rounded-full hover:bg-rose-50 hover:border-rose-300 transition-colors"
                >
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
