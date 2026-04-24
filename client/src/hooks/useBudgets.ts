import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../api/budgets";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useBudgets = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ["budgets", month, year],
    queryFn: () => getBudgets(month, year),
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
    onError: (error: any) => {
      toast.error(error.message || "Error creating budget");
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
    onError: (error: any) => {
      toast.error(error.message || "Error updating budget");
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error deleting budget");
    },
  });
};