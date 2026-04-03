import { useState } from "react";
import { Plus, X, ListFilter, LayoutGrid } from "lucide-react";
import TransactionForm from "../components/TransactionForm";
import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";
import TransactionCard from "../components/TransactionCard";

const Transaction = () => {
  const { data: transactions, isLoading } = useTransactions();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

      {/* Stats/Filter Bar (Optional Visual Polish) */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <div className="badge badge-outline gap-1 p-4"><ListFilter size={14}/> All</div>
        <div className="badge badge-ghost gap-1 p-4">Income</div>
        <div className="badge badge-ghost gap-1 p-4">Expense</div>
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
              type={tx.transaction_type}
              category={tx.category_name}
              account={tx.account_name}
              onEdit={() => {
                setEditingTransaction(tx);
                setIsEditOpen(true);
              }}
              onDelete={() => {
                if(confirm("Are you sure?")) deleteTransaction(tx.id);
              }}
            />
          ))}
        </div>
      )}

      {/* Add Transaction Modal */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50 text-base-content/50"
            >
              <X size={20} />
            </button>
            <TransactionForm
              mode="add"
              onSuccess={() => setIsAddOpen(false)}
            />
          </div>
          <div className="modal-backdrop bg-base-900/40 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {isEditOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <button 
              onClick={() => {
                setIsEditOpen(false);
                setEditingTransaction(null);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50 text-base-content/50"
            >
              <X size={20} />
            </button>
            <TransactionForm
              mode="edit"
              transaction={editingTransaction}
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingTransaction(null);
              }}
            />
          </div>
          <div className="modal-backdrop bg-base-900/40 backdrop-blur-sm" onClick={() => setIsEditOpen(false)}></div>
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
