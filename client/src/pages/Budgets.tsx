import { useState } from "react";

import { useBudgets } from "../hooks/useBudgets";
import { useBudgetModals } from "../components/budgets/useBudgetModals";

import BudgetHeader from "../components/budgets/BudgetHeader";
import BudgetFilters from "../components/budgets/BudgetFilters";
import BudgetGrid from "../components/budgets/BudgetGrid";
import RectangularLoadingSkeleton from "../components/RectangularLoadingSkeleton";
import BudgetModals from "../components/budgets/BudgetModals";
import BudgetSorts from "../components/budgets/BudgetSorts";

// Helper to get month names
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate last 5 years and next 5 years
const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
};

const Budget = () => {
  // --- Filters ---
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  
  const [selectedOrder, setSelectedOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");

  // --- Fetch Data ---
  const {
    data: budgets,
    isLoading,
    error,
  } = useBudgets(selectedMonth, selectedYear, sortBy, selectedOrder);

  const modals = useBudgetModals();

  // --- Error UI ---
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="alert alert-error shadow-lg">
          <span>
            {error?.message || "Failed to load budgets. Please try again."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-base-100 space-y-6">
      
      {/* Header */}
      <BudgetHeader onAdd={() => modals.setIsAddOpen(true)} />

      {/* Filters */}
      <BudgetFilters
        month={selectedMonth}
        year={selectedYear}
        setMonth={setSelectedMonth}
        setYear={setSelectedYear}
        months={MONTHS}
        years={getYears()}
      />
      
      <BudgetSorts
        order={selectedOrder}
        isLoading={isLoading}
        onClickDescending={() => {
          setSelectedOrder(selectedOrder==="asc" ? "desc" : "asc")}
        }
        onSortChange={(val) => setSortBy(val)}
      />

      {/* Loading */}
      {isLoading ? (
        <RectangularLoadingSkeleton 
          amount={8}
          height={60}
        />
      ) : (
        <BudgetGrid
          data={budgets}
          onEdit={(budget) => {
            modals.setEditingBudget(budget);
            modals.setIsEditOpen(true);
          }}
          onDelete={(budget) => {
            modals.setDeletingBudget(budget);
            modals.setIsDeleteOpen(true);
          }}
        />
      )}

      {/* Modals */}
      <BudgetModals modals={modals} />
    </div>
  );
};

export default Budget;