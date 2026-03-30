import React from 'react'
import { useAuth } from "../hooks/useAuth"
import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions"
import AddTransactionForm from "../components/AddTransactionForm"

const Dashboard = () => {
  const { data: userInfo, isLoading: userLoading } = useAuth();
  const { data: transactions, isLoading: txLoading } = useTransactions();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  if (userLoading || txLoading) {
    return <p>Loading dashboard...</p>;
  }

  const user = userInfo.first_name;

  const handleDeleteTransaction = (id: number) => {
    deleteTransaction(id);
  };

  return (
    <div>
      <p className="text-2xl font-bold">
        Welcome Back <span className="text-blue-600">{user}</span>
      </p>

      <p>Showing {transactions?.length} transactions</p>

      <AddTransactionForm />

      <div>
        {transactions?.map((transaction) => (
          <div key={transaction.id} className="flex flex-row justify-evenly">
            <p>Amount: {transaction.amount}</p>

            <button
              onClick={() => handleDeleteTransaction(transaction.id)}
              className="border-1 border-red-700"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard