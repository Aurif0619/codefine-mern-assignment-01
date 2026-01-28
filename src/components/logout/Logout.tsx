import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import confetti from "canvas-confetti";

type OutletContextType = {
  logout?: () => void;
  clearCart?: () => void; 
};

export default function Logout() {
  const navigate = useNavigate();
  const context = useOutletContext() as OutletContextType;
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fireConfetti = () => {
      const duration = 1800;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    };

    const performLogout = () => {
      if (context?.logout) {
        context.logout();
      }
      
      if (context?.clearCart) {
        context.clearCart();
      }
      
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('userData');
      
      fireConfetti();
      setShowToast(true);
    };

    performLogout();

    const timer = setTimeout(() => {
      navigate("/signup");
    }, 2500);

    return () => clearTimeout(timer);
  }, [context, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-600">Logging you out...</p>
      </div>

      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3">
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
              <p className="font-bold">Logged Out Successfully!</p>
              <p className="text-sm opacity-90">
                Redirecting to signup page
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}