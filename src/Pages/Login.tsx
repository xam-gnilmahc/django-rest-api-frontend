import React, { useEffect, useState } from "react";

const PaymentIcon: React.FC<{ className?: string }> = ({
  className = "w-10 h-10 text-emerald-600",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const Login: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg) setMessage(msg);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8080/api/google/redirect";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-800 dark:via-gray-900 dark:to-black p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 transition-colors duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <PaymentIcon />
          </div>

          {/* Error Message */}
          {message && (
            <p className="text-red-600 dark:text-red-400 text-center font-medium mb-4">
              {message}
            </p>
          )}

          <h1 className="text-3xl font-bold text-center text-green-900 dark:text-green-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-green-700 dark:text-gray-400 mb-6">
            Sign in with your Google account to continue.
          </p>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium shadow-sm hover:bg-green-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
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

          {/* Terms */}
          <p className="mt-6 text-center text-sm text-green-600 dark:text-gray-400 select-none">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2">
        <img
          src="yt.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
