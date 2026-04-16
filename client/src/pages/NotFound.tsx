import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-base-200">
            <Search size={48} className="text-base-content/60" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-primary">404</h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold mt-4">
          Page not found
        </h2>

        <p className="text-base-content/60 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary gap-2"
          >
            <Home size={18} />
            Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;