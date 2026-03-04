import React from 'react'
import ExpenseTable from "../components/ExpenseTable"
import AddExpense from "../components/AddExpense"
const Expense = () => {
  return (
    <div>
      <ExpenseTable />
      <AddExpense />
    </div>
  )
}

export default Expense