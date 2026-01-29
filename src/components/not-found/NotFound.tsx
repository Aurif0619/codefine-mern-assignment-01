import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold text-gray-300 opacity-30">
            404
          </h1>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="absolute -top-6 -right-6 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              
              <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center animate-float">
                <svg
                  className="w-12 h-12 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, let's get you back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block text-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Go Home</span>
            </div>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Go Back</span>
            </div>
          </button>
        </div>

        <div className="relative h-32">
          <div className="absolute left-1/4 top-4 w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute left-1/3 top-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute right-1/3 top-12 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute right-1/4 top-6 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 text-gray-500 animate-pulse">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm">Searching for the missing page...</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/" className="text-red-500 hover:text-red-600 font-medium">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}