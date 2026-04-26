import { useSavings, useDeleteSavings } from "../hooks/useSavings";
import { useSavingsModals } from "../components/savings/useSavingsModals";

import SavingsHeader from "../components/savings/SavingsHeader";
import SavingsGrid from "../components/savings/SavingsGrid";
import SavingsEmptyState from "../components/savings/SavingsEmptyState";
import SavingsModals from "../components/savings/SavingsModals";

const Savings = () => {
  const { data: savings, isLoading } = useSavings();
  const { mutate: deleteSavings, isPending } = useDeleteSavings();

  const modals = useSavingsModals();

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen">

      {/* HEADER */}
      <SavingsHeader
        savingsLength={savings?.length || 0}
        onAdd={() => modals.setIsAddOpen(true)}
      />

      {/* GRID */}
      <SavingsGrid
        savings={savings}
        isLoading={isLoading}
        onEdit={(item) => {
          modals.setEditingSavings(item);
          modals.setIsEditOpen(true);
        }}
        onDelete={(item) => {
          modals.setDeletingSavings(item);
          modals.setIsDeleteOpen(true);
        }}
      />

      {/* EMPTY STATE */}
      {!isLoading && savings?.length === 0 && (
        <SavingsEmptyState />
      )}

      {/* MODALS */}
      <SavingsModals
        {...modals}
        deleteSavings={deleteSavings}
        isPending={isPending}
      />
    </div>
  );
};

export default Savings;