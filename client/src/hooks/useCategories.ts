import API from "../api/api";
import { 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../api/categories"
import { 
  useQueryClient, 
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useCategories = (type?: string) => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => getCategories(type),
    
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });
};


export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully")
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ||"Error creating category")
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully")
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ||"Error updating category")
    }
  })
}


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ||"Error deleting category")
    }
  })
}