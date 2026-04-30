import TransactionCard from "./TransactionCard";
import TransactionsLoader from "./TransactionsLoader";

const TransactionsGrid = ({
  transactions,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <TransactionsLoader />
    );
  }

  if (!transactions?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.id}
          amount={tx.amount}
          date={tx.transaction_date}
          type={tx.type}
          category={tx.category_name}
          onEdit={() => onEdit(tx)}
          onDelete={() => onDelete(tx)}
          title={tx.savings_title}
        />
      ))}
    </div>
  );
};

export default TransactionsGrid;