import React from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useTransactions,
  useDeleteTransaction,
} from "../hooks/useTransactions";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: userInfo, isLoading: userLoading } = useAuth();
  const { data: transactions, isLoading: txLoading } = useTransactions();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  if (userLoading || txLoading) {
    return <p>Loading dashboard...</p>;
  }

  const handleDeleteTransaction = (id: number) => {
    deleteTransaction(id);
  };

  return (
    <div className="p-4 space-y-6">

      {/* Header */}
      <div>
        <p className="text-2xl font-bold">
          Welcome Back{" "}
          <span className="text-blue-600">
            {userInfo.first_name}
          </span>
        </p>
        <p className="text-gray-500">
          Showing {transactions?.length} transactions
        </p>
      </div>

      {/* CREATE FORM */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>

        <TransactionForm mode="create" />
      </div>

      {/* TRANSACTIONS LIST */}
      <div className="space-y-3">
        {transactions?.map((transaction: any) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <p>
              <span className="font-semibold">Amount:</span>{" "}
              {transaction.amount}
            </p>

            <div className="flex gap-2">

              {/* EDIT */}
              <button
                onClick={() => {
                  setSelectedTransaction(transaction);
                  setIsModalOpen(true);
                }}
                className="border border-blue-500 px-3 py-1 rounded"
              >
                EDIT
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDeleteTransaction(transaction.id)}
                className="border border-red-600 px-3 py-1 rounded"
              >
                DELETE
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white p-6 rounded-xl w-full max-w-xl relative">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">
              Update Transaction
            </h2>

            <TransactionForm
              mode="update"
              transaction={selectedTransaction}
              onSuccess={() => setIsModalOpen(false)}
            />

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;