import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data; 
    },
  });
};
