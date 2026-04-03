import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users"

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getUserInfo,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};