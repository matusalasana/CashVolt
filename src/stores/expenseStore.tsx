import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

interface ExpenseState {
  items: Expense[];
  totalExpense: number;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  removeExpense: (id: string) => void;
  clearAll: () => void;
}

const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      items: [],
      totalExpense: 0,

      addExpense: (newExpense) =>
        set((state) => {
          const expenseWithMetadata = {
            ...newExpense,
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0, 10),
          };
          
          const updatedItems = [...state.items, expenseWithMetadata];
          
          return {
            items: updatedItems,
            // Calculate total from the updated array
            totalExpense: updatedItems.reduce((sum, item) => sum + item.amount, 0),
          };
        }),

      removeExpense: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            totalExpense: updatedItems.reduce((sum, item) => sum + item.amount, 0),
          };
        }),

      clearAll: () => set({ items: [], totalExpense: 0 }),
    }),
    {
      name: 'expense-storage',
    }
  )
);

export default useExpenseStore;
