import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
        <div className="loading bg-blue-700 loading-spinner loading-lg"></div>
        <p className="skeleton text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-base-200 skeleton-text font-bold">CashVolt</p>
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