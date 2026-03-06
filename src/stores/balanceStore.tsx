// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import useIncomeStore from "./incomeStore"
// import useExpenseStore from "./expenseStore"

// interface BalanceState {
//   availableBalance: number;
//   totalIncome: number;
//   totalExpense: number;
// }

// const totalExpense = useExpenseStore((state) => state.totalExpense) 
// const totalIncome = useIncomeStore((state) => state.totalIncome)

// const useBalanceStore = create<BalanceState>()(
//   persist(
//     (set) => ({
//       availableBalance: 0,

//       availableBalance: totalIncome - totalExpense
//     }),
//     {
//       name: 'balance-storage',
//     }
//   )
// );

// export default useBalanceStore;