import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // IMPORTANT: treat error as unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (isError) {
    throw new Error("Error occurred")
  }

  return <Outlet />;
};

export default ProtectedRoutes;