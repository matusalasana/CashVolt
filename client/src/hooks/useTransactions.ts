
import { 
  getTransactions, 
  deleteTransaction,  
  createTransaction,
  updateTransaction
} from "../api/transactions"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useTransactions = (
  type?: string, 
  sortBy?: string, 
  order?: string,
  limit?: number, 
  offset?: number) => {
    
  return useQuery({
    queryKey: [
      "transactions", 
      type, 
      sortBy, 
      order, 
      limit, 
      offset
    ],
    queryFn: () =>  getTransactions(
      type, 
      sortBy, 
      order, 
      limit, 
      offset
    ),
    
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: type != null && sortBy != null && limit != null && offset != null && order != null,
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
      toast.error(error.message ||"Failed to create the transaction");
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
      toast.error(error.message ||"Failed to delete");
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
      toast.error(error.message ||"Failed to update")
    },
    
  });
};