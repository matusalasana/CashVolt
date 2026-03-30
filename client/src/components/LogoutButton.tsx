import API from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refetch } = useAuth();

  const handleLogout = async () => {
    try {
      // First, call the logout endpoint
      await API.post("/auth/logout");
      
      // Clear all cached queries to prevent showing old data
      await queryClient.clear();
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Navigate to login page
      navigate("/login");
      
      await refetch(); // refetch() ensures the auth state is fresh when user returns
      
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline">
      Logout
    </button>
  );
};

export default LogoutButton;