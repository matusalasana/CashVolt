import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth"

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getUserInfo
  });
};