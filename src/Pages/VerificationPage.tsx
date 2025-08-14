import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import success from "../Lottie/success.json";
import Lottie from "lottie-react";

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyTokens = () => {
      const params = new URLSearchParams(window.location.search);
      const access = params.get("access");
      const refresh = params.get("refresh");

      if (access && refresh) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        // Check if token is stored correctly
        const storedAccess = localStorage.getItem("accessToken");
        if (storedAccess === access) {
          setVerifying(false);
          // After short delay, navigate to dashboard
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        } else {
          console.error("Token not stored properly, retrying...");
          setTimeout(verifyTokens, 500);
        }
      } else {
        console.error("Missing tokens in callback");
        navigate("/login", { replace: true });
      }
    };

    verifyTokens();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
      {verifying ? (
        <p className="text-gray-700 text-lg font-medium">
          Verifying ID and verification...
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-20">
            <Lottie animationData={success} loop={true} />
          </div>
          <p className="text-green-600 text-lg font-semibold">
            Verification successful! Redirecting...
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
