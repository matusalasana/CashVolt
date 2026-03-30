import React from 'react'
import { useAuth } from "../hooks/useAuth"
import { useTransactions } from "../hooks/useTransactions"
import AddTransactionForm from "../components/AddTransactionForm"

const Dashboard = () => {
  const { data: userInfo, isLoading: userLoading } = useAuth();
  const { data: transactions, isLoading: txLoading, isError } = useTransactions();
  
  if (userLoading || txLoading) {
    return <p>Loading dashboard...</p>;
  }
  const user = userInfo.first_name
  return (
    <div>
      <p className="text-2xl font-bold">Welcome Back <span className="text-blue-600">{user}</span></p>
      <p>Showing {transactions?.length} transactions</p>
      <AddTransactionForm />
    </div>
  )
}

export default Dashboard