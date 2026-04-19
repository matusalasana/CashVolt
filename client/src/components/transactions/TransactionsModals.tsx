import TransactionForm from "./TransactionForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";

const TransactionsModals = ({
  modals,
  deleteTransaction,
  isDeleting,
  isTransactionLoading,
}) => {
  const {
    isAddOpen,
    setIsAddOpen,

    isEditOpen,
    setIsEditOpen,
    editingTransaction,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingTransaction,
    setDeletingTransaction,
  } = modals;

  return (
    <>
      {/* ADD */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <TransactionForm
              mode="add"
              onSuccess={() => setIsAddOpen(false)}
              isTransactionLoading={isTransactionLoading}
            />
          </div>

          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={() => setIsAddOpen(false)}
          />
        </div>
      )}

      {/* EDIT */}
      {isEditOpen && editingTransaction && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <TransactionForm
            mode="edit"
            transaction={editingTransaction}
            onSuccess={() => setIsEditOpen(false)}
            isTransactionLoading={isTransactionLoading}
          />
        </div>
      )}

      {/* DELETE */}
      {isDeleteOpen && deletingTransaction && (
        <DeleteConfirmationCard
          item_name="Transaction"
          isDeleting={isDeleting}
          onCancel={() => setIsDeleteOpen(false)}
          onDelete={() => {
            deleteTransaction(deletingTransaction.id, {
              onSuccess: () => {
                setIsDeleteOpen(false);
                setDeletingTransaction(null);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default TransactionsModals;