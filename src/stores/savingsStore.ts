import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavingsState {
  savings: number;
  goal: number;
  setSavings: (val: number) => void;
  setGoal: (val: number) => void;
}

const useSavingsStore = create<SavingsState>()(
  persist(
    (set) => ({
      savings: 0,
      goal: 0,
      setSavings: (val) => set({ savings: val }),
      setGoal: (val) => set({ goal: val }),
    }),
    {
      name: 'savings-storage', // Key in localStorage
    }
  )
);

export default useSavingsStore;
