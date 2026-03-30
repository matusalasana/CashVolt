
import API from "../api/api";
import { getTransactions } from "../api/transactions"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";
import { toast } from "react-hot-toast";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    
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

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};