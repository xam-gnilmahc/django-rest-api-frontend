import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../Lottie/404.json";
import Lottie from "lottie-react";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      
      <div className="flex flex-col items-center text-center gap-4">
        <Lottie animationData={notFound} loop className="w-56 h-56 sm:w-72 sm:h-72" />
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back home.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg transition transform hover:-translate-y-1"
          aria-label="Go back to homepage"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
