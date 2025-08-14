import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 text-gray-800">
      {/* SVG Illustration */}
      <svg
        className="w-64 h-64 mb-8"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 384 512"
        stroke="currentColor"
      >
        <path
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M199.38 160.67L55.6 319.28a16 16 0 0011.35 27.45h250.11a16 16 0 0011.34-27.45L184.63 160.67a12.17 12.17 0 00-17.25 0zM372 160a12 12 0 00-12-12H24a12 12 0 00-12 12v192a12 12 0 0012 12h336a12 12 0 0012-12zm-176 88a16 16 0 1116-16 16 16 0 01-16 16z"
        />
      </svg>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>

      {/* Message */}
      <p className="text-center max-w-md mb-8 text-gray-600">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition"
        aria-label="Go back to homepage"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
