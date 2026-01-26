import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // min 8 chars, 1 uppercase, 1 lowercase, 1 number
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be 8+ chars with uppercase, lowercase & number"
      );
      return;
    }

    setError("");
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Sign Up
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.5 0-10-4-11-8 1-2.5 3-4.5 5.06-5.94" />
                    <path d="M1 1l22 22" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5.5 0 10 4 11 8a11.05 11.05 0 0 1-2.06 3.94" />
                  </svg>
                ) : (

                  <svg
                    width="20"
                    height="20"
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

            <p className="text-xs text-gray-500 mt-2">
              8+ chars, uppercase, lowercase & number required
            </p>

            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-300 text-white font-semibold hover:bg-yellow-400 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
