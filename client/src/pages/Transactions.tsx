import { useState } from "react";

import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";
import { useTransactionModals } from "../components/transactions/useTransactionModals";
import TransactionPagination from "../components/transactions/TransactionPagination";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsFilters from "../components/transactions/TransactionsFilters";
import TransactionsGrid from "../components/transactions/TransactionsGrid";
import TransactionsEmptyState from "../components/transactions/TransactionsEmptyState";
import TransactionsModals from "../components/transactions/TransactionsModals";
import TransactionSorts from "../components/transactions/TransactionSorts";

const Transaction = () => {
  const [selectedType, setSelectedType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  const transactionsLimit = 10;
  const offset = transactionsLimit * (pageNumber - 1);

  const { data: transactions, isLoading } =
    useTransactions(selectedType, sortBy, order, transactionsLimit, offset);

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
      
      <TransactionSorts
        order={order}
        onClickDescending={() => {
          setOrder(order === "desc" ? "asc" : "desc");
        }}
        onSortChange={(value) => setSortBy(value)}
        isLoading={isLoading}
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
        isTransactionLoading={isLoading}
      />

      <TransactionPagination 
        onClickNext={() => setPageNumber(prev => prev + 1)}
        onClickPrevious={() => setPageNumber(prev => prev - 1)}
        pageNumber={pageNumber}
        isLastPage={transactions?.length < transactionsLimit}
        isFirstPage={pageNumber === 1}
      />
    </div>
  );
};

export default Transaction;