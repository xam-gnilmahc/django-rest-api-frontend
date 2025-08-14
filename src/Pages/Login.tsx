import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg) setMessage(msg);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://django-rest-api-8c23.onrender.com/api/google/redirect";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-10">
        <div className="w-ful max-w-md   p-10 flex flex-col gap-8">
          {message && (
            <p className="text-red-600 text-center font-medium">{message}</p>
          )}

          <h1 className="text-4xl font-extrabold text-green-900 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-green-700">
            Sign in with your Google account to continue.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-green-50 hover:shadow-md transition transform hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-18.5-1.5-36.2-4.3-53.4H272v101h146.9c-6.4 34.7-25.9 64.1-55.4 83.8v69.6h89.5c52.3-48.2 82.5-119.2 82.5-200z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c74.7 0 137.5-24.7 183.3-67.1l-89.5-69.6c-24.7 16.6-56.4 26.5-93.8 26.5-72 0-133-48.6-154.9-114.3H25.6v71.6C71.9 487.3 165.3 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M117.1 320.8c-5.4-16.5-8.5-34.1-8.5-52.2 0-18.1 3.1-35.7 8.5-52.2V144.8H25.6c-18.7 37.4-29.5 79.3-29.5 123.8s10.8 86.4 29.5 123.8l91.5-71.6z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c40.6 0 77 13.9 105.8 41.3l79.1-79.1C407.6 24.7 344.7 0 272 0 165.3 0 71.9 56.9 25.6 144.8l91.5 71.6c21.9-65.7 82.9-114.3 154.9-114.3z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-green-600 select-none">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-green-700 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-green-700 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Side - Modern Illustration */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-tr from-green-400 to-green-500 relative overflow-hidden">
        <svg
          className="w-3/4 h-3/4 animate-float"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          {/* <circle cx="200" cy="200" r="200" fill="#00A859" opacity="0.1" /> */}

          {/* Wallet */}
          <rect
            x="80"
            y="180"
            width="160"
            height="100"
            rx="20"
            fill="#007F3F"
          />
          <rect x="80" y="180" width="160" height="40" rx="20" fill="#00C97D" />
          <circle cx="220" cy="220" r="15" fill="#A8F7C1" />

          {/* Credit card */}
          <rect
            x="120"
            y="150"
            width="160"
            height="60"
            rx="12"
            fill="#00C97D"
          />
          <rect
            x="120"
            y="150"
            width="160"
            height="20"
            rx="12"
            fill="#1E7F3E"
          />
          <circle cx="260" cy="180" r="12" fill="#A8F7C1" />

          {/* Receipt */}
          <rect x="140" y="120" width="80" height="40" rx="8" fill="#A8F7C1" />
          <line
            x1="150"
            y1="130"
            x2="210"
            y2="130"
            stroke="#00A859"
            strokeWidth="2"
          />
          <line
            x1="150"
            y1="140"
            x2="210"
            y2="140"
            stroke="#00A859"
            strokeWidth="2"
          />

          {/* Floating Dollar Coin */}
          <circle
            cx="300"
            cy="100"
            r="25"
            fill="#A8F7C1"
            className="shadow-lg"
          />
          <text
            x="300"
            y="105"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#00A859"
          >
            $
          </text>
        </svg>
      </div>

      {/* Float Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
