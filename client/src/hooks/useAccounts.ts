
import { 
  getAccounts, 
  createAccount, 
  updateAccount, 
  deleteAccount} from "../api/accounts"
import { 
  useQueryClient, 
  useQuery, 
  useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
    retry: 1,
    staleTime: 1000*60*5,
  });
};


export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAccount,
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"]
      })
      toast.success("Account added successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Error adding new account")
    }
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAccount,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast.success("Account updated")
    },

    onError: (error) => {
      toast.error(error.message || "Error updating the account")
    }
  })
}


export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({
        queryKey: ["accounts"]
      });
      
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account")
    }
  });
};