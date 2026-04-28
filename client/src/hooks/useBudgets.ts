import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../api/budgets";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../utils/getErrorMessage";


export const useBudgets = (
  month?: number, 
  year?: number,
  sortBy?: string, 
  order?: string
) => {
  return useQuery({
    queryKey: ["budgets", month, year, sortBy, order],
    queryFn: () => getBudgets(month, year, sortBy, order),
    enabled: month != null && year != null,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      toast.success("Budget added successfully");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBudget,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      toast.success("Budget deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  });
};