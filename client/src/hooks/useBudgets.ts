import {
  getBudgets,
  createBudget, 
  updateBudget
} from "../api/budgets";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
  
  export const useBudgets = () => {
    return useQuery({
      queryKey: ['budgets'],
      queryFn: getBudgets
    })
  }
  
  export const useCreateBudget = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: createBudget,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey:['budgets']
        })
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Error creating budget")
      }
    })
  }
  
  export const useUpdateBudget = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: updateBudget,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey:['budgets']
        })
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Error updating budget")
      }
    })
  }
  
  export const useDeleteBudget = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: deleteBudget,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey:['budgets']
        })
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Error deleting budget")
      }
    })
  }