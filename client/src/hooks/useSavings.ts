import {
  getSavings,
  createSavings,
  updateSavings,
  deleteSavings
} from "../api/savings";

import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/getErrorMessage";


// GET ALL SAVINGS
export const useSavings = () => {
  return useQuery({
    queryKey: ["savings"],
    queryFn: getSavings,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};


// CREATE SAVINGS
export const useCreateSavings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSavings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savings"],
      });

      toast.success("Savings goal created successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};


// UPDATE SAVINGS
export const useUpdateSavings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSavings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savings"],
      });

      toast.success("Savings updated");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};


// DELETE SAVINGS
export const useDeleteSavings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSavings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["savings"],
      });

      toast.success("Savings deleted");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};