import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { 
  getUser,
  loginUser,
  registerUser,
  logoutUser
  } from "../api/auth"

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getUser
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: loginUser, 
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
    toast.success("Login successful")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed: server error")
    }
  })
}


export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: registerUser, 
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
      toast.success("Signup successful")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong, please try again")
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: logoutUser,
    
    onSuccess: () => {
      queryClient.clear()
      toast.success("Logged out successfully")
    },

    onError: (error: any) => {
      toast.error(error?.message || "Logout failed")
    }
  })
}