
import API from "../api/api";
import { 
  getTransactions, 
  deleteTransaction,  
  createTransaction,
  updateTransaction
} from "../api/transactions"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useTransactions = (type?: string) => {
  return useQuery({
    queryKey: ["transactions", type],
    queryFn: () =>  getTransactions(type),
    
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Transaction added successfully")

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ||"Failed to create");
    },
  });
};


export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      toast.success("Transaction deleted");

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ||"Failed to delete");
    },
  });
};


export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateTransaction,
    
    onSuccess: () => {
      toast.success("Transaction updated")
      queryClient.invalidateQueries({
      queryKey: ["transactions"],
      exact: false,
    });
    },
    
    onError: (error) => {
      toast.error(error?.message ||"Failed to update")
    },
    
  });
};