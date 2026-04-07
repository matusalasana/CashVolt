import { useState } from "react";
import { Plus, X, LayoutGrid } from "lucide-react";

// Components
import TransactionForm from "../components/TransactionForm";
import TransactionCard from "../components/TransactionCard";
import DeleteConfirmationCard from "../components/DeleteConfirmationCard";

// Hooks
import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";

const Transaction = () => {
  // --- State Management ---
  const [selectedType, setSelectedType] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  // Modal Visibility States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- Data Fetching & Mutations ---
  const { data: transactions, isLoading } = useTransactions(selectedType);
  const { mutate: deleteTransaction , isPending} = useDeleteTransaction();

  // --- Handlers ---
  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-base-content/60">Manage your income and expenses</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="btn btn-primary gap-2 shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && deletingTransaction && (
        <DeleteConfirmationCard
          item_name={"Transaction"}
          onCancel={() => setIsDeleteOpen(false)}
          isDeleting ={isPending}
          onDelete={() => {
            if (!deletingTransaction || isPending) return;
          
            deleteTransaction(deletingTransaction.id, {
              onSuccess: () => {
                setIsDeleteOpen(false);
                setDeletingTransaction(null);
              },
            });
          }}
        />
      )}

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <div
          onClick={() => setSelectedType("")}
          className={`badge p-4 cursor-pointer ${
            selectedType === "" ? "badge-primary" : "badge-ghost"
          }`}
        >
          All
        </div>

        <div
          onClick={() => setSelectedType("income")}
          className={`badge p-4 cursor-pointer ${
            selectedType === "income" ? "badge-success" : "badge-ghost"
          }`}
        >
          Income
        </div>

        <div
          onClick={() => setSelectedType("expense")}
          className={`badge p-4 cursor-pointer ${
            selectedType === "expense" ? "badge-error" : "badge-ghost"
          }`}
        >
          Expense
        </div>
      </div>

      {/* Main Content: Transactions Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions?.map((tx) => (
            <TransactionCard
              key={tx.id}
              amount={tx.amount}
              description={tx.description}
              date={tx.transaction_date}
              type={tx.type}
              category={tx.category_name}
              account={tx.account_name}
              onEdit={() => {
                setEditingTransaction(tx);
                setIsEditOpen(true);
              }}
              onDelete={() => {
                setDeletingTransaction(tx);
                setIsDeleteOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Add Transaction Modal */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
          
            <TransactionForm 
              mode="add" 
              onSuccess={() => setIsAddOpen(false)} 
            />
          </div>
          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={() => setIsAddOpen(false)}
          ></div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {isEditOpen && editingTransaction && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <TransactionForm
              mode="edit"
              transaction={editingTransaction}
              onSuccess={closeEditModal}
            />
          </div>
          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={closeEditModal}
          ></div>
        </div>
      )}

      {/* Empty State */}
      {transactions?.length === 0 && !isLoading && (
        <div className="text-center py-20 opacity-50">
          <LayoutGrid className="mx-auto mb-4" size={48} />
          <p className="text-xl">No transactions found.</p>
        </div>
      )}
    </div>
  );
};

export default Transaction;
