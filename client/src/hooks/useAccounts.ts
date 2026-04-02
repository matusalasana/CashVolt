import API from "../api/api";
import { getAccounts, createAccount} from "../api/accounts"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
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
    onError: () => {
      toast.error("Error adding new account")
    }
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"]
      })
      toast.success("Account updated")
    },
    onError: () => {
      toast.error("Error updating the account")
    }
  });
};