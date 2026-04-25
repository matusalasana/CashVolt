import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { 
  getUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
  } from "../api/auth";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
    retry: false,
    staleTime: 1000*60*30,
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
      toast.error(getErrorMessage(error))
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: updateUser, 
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
    toast.success("Updated successfully")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
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
      toast.error(getErrorMessage(error))
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

    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}