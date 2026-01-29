import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be 6+ chars with uppercase, lowercase & number";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        name,
        email,
        password,
        isLoggedIn: false, // IMPORTANT: Set to false initially
        token: `token_${Date.now()}`,
      };

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      const userExists = existingUsers.find((user: any) => user.email === email);
      if (userExists) {
        setIsLoading(false);
        setErrors({ email: "User with this email already exists" });
        return;
      }

      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, userData]),
      );
      
      setIsLoading(false);
      setShowConfetti(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1000);
  };

  const checkPasswordStrength = () => {
    if (!password) return { score: 0, message: "", color: "bg-gray-200" };

    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    const strength = [
      { score: 0, color: "bg-red-500", message: "Very Weak" },
      { score: 1, color: "bg-orange-500", message: "Weak" },
      { score: 2, color: "bg-yellow-500", message: "Fair" },
      { score: 3, color: "bg-blue-500", message: "Good" },
      { score: 4, color: "bg-green-500", message: "Strong" }
    ];

    return strength[score] || strength[0];
  };

  const passwordStrength = checkPasswordStrength();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-orange-50 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Confetti Pieces */}
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full animate-confetti-drop`}
                style={{
                  backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
                    '#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'
                  ][i % 10],
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
            
            {/* Success Message Modal - Update the message */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-scale-in">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Created Successfully!</h3>
                  {/* Updated message */}
                  <p className="text-gray-600 mb-4">Please login with your credentials. Redirecting to login page...</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-red-500 to-red-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/90">Join our community today</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  placeholder="Enter your full name"
                  className={`mt-1 w-full pl-10 pr-4 py-3.5 rounded-xl border ${errors.name ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="Enter your email"
                  className={`mt-1 w-full pl-10 pr-4 py-3.5 rounded-xl border ${errors.email ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  placeholder="Create a strong password"
                  className={`mt-1 w-full pl-10 pr-12 py-3.5 rounded-xl border ${errors.password ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 1l22 22" />
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.5 0-10-4-11-8 1-2.5 3-4.5 5.06-5.94" />
                      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5.5 0 10 4 11 8a11.05 11.05 0 0 1-2.06 3.94" />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Password Strength
                    </span>
                    <span
                      className={`text-sm font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}
                    >
                      {passwordStrength.message}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{
                        width: `${(passwordStrength.score || 0) * 20}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  Password must contain:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li
                    className={`flex items-center ${password.length >= 6 ? "text-green-500" : ""}`}
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {password.length >= 6 ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      )}
                    </svg>
                    At least 6 characters
                  </li>
                  <li
                    className={`flex items-center ${/[A-Z]/.test(password) ? "text-green-500" : ""}`}
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/[A-Z]/.test(password) ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      )}
                    </svg>
                    One uppercase letter (A-Z)
                  </li>
                  <li
                    className={`flex items-center ${/[a-z]/.test(password) ? "text-green-500" : ""}`}
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/[a-z]/.test(password) ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      )}
                    </svg>
                    One lowercase letter (a-z)
                  </li>
                  <li
                    className={`flex items-center ${/\d/.test(password) ? "text-green-500" : ""}`}
                  >
                    <svg
                      className="w-3 h-3 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/\d/.test(password) ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      )}
                    </svg>
                    One number (0-9)
                  </li>
                </ul>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-500 text-white font-bold text-lg hover:from-red-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}