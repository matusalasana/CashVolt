import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../api/transactionService";
import { type Transaction } from "../types/transaction";

export const useTransactions = (type?: string) => {
  const queryClient = useQueryClient();

  // 1. FETCH all data
  const query = useQuery({
    queryKey: ["transactions", type],
    queryFn: () => transactionService.getAll(type),
  });

  // 2. ADDING data
  const addMutation = useMutation({
    mutationFn: (newTx: Transaction) => transactionService.create(newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); 
    },
  });

  // 3. DELETING data
  const deleteMutation = useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); 
    },
  });
  
const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) => 
    transactionService.update(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  },
});


  return {
    transactions: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    addTransaction: addMutation.mutate,
    isAdding: addMutation.isPending,
    deleteTransaction: deleteMutation.mutate,
    updateTransaction: updateMutation.mutate,
  };
};

