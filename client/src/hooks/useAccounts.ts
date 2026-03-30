import API from "../api/api";
import { getAccounts } from "../api/accounts"
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
    
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};