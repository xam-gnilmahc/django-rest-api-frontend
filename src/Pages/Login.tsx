import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg) setMessage(msg);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://djangofrontend.netlify.app/api/google/redirect";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-8">
        <div className="w-full max-w-md p-8">
          {message && (
            <p className="text-red-600 text-center font-medium mb-4">
              {message}
            </p>
          )}

          <h1 className="text-3xl font-bold text-green-900 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-green-700 mb-6">
            Sign in with your Google account to continue.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-green-100 transition-all duration-200"
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
