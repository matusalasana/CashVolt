import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Income {
  id: string;
  source: string;
  description: string;
  amount: number;
  date: string;
}

interface IncomeState {
  items: Income[];
  totalIncome: number;
  addIncome: (income: Omit<Income, 'id' | 'date'>) => void;
  removeIncome: (id: string) => void;
  clearAll: () => void;
}

const useIncomeStore = create<IncomeState>()(
  persist(
    (set) => ({
      items: [],
      totalIncome: 0,

      addIncome: (newIncome) =>
        set((state) => {
          const updatedItems = [
            ...state.items,
            {
              ...newIncome,
              id: crypto.randomUUID(),
              date: new Date().toISOString().slice(0, 10),
            },
          ];
          
          return {
            items: updatedItems,
            totalIncome: updatedItems.reduce((sum, item) => sum + item.amount, 0),
          };
        }),

      removeIncome: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            totalIncome: updatedItems.reduce((sum, item) => sum + item.amount, 0),
          };
        }),

      clearAll: () => set({ items: [], totalIncome: 0 }),
    }),
    {
      name: 'income-storage',
    }
  )
);

export default useIncomeStore;
