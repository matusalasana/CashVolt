import { useState } from "react";

import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";
import { useTransactionModals } from "../components/transactions/useTransactionModals";

import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsFilters from "../components/transactions/TransactionsFilters";
import TransactionsGrid from "../components/transactions/TransactionsGrid";
import TransactionsEmptyState from "../components/transactions/TransactionsEmptyState";
import TransactionsModals from "../components/transactions/TransactionsModals";

const Transaction = () => {
  const [selectedType, setSelectedType] = useState("");

  const { data: transactions, isLoading } =
    useTransactions(selectedType);

  const { mutate: deleteTransaction, isPending } =
    useDeleteTransaction();

  const modals = useTransactionModals();

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-base-100">

      <TransactionsHeader
        onAdd={() => modals.setIsAddOpen(true)}
      />

      <TransactionsFilters
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <TransactionsGrid
        transactions={transactions}
        isLoading={isLoading}
        onEdit={(tx) => {
          modals.setEditingTransaction(tx);
          modals.setIsEditOpen(true);
        }}
        onDelete={(tx) => {
          modals.setDeletingTransaction(tx);
          modals.setIsDeleteOpen(true);
        }}
      />

      {!isLoading && !transactions?.length && (
        <TransactionsEmptyState />
      )}

      <TransactionsModals
        modals={modals}
        deleteTransaction={deleteTransaction}
        isDeleting={isPending}
      />
    </div>
  );
};

export default Transaction;