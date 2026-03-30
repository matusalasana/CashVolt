import { useQuery } from "@tanstack/react-query";
import API from "../api/api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await API.get("/auth/me"); 
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};