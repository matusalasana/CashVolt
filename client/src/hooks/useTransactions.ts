import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { type Transaction } from '../types';

const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/transactions');
  return data;
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 5,
  });
};