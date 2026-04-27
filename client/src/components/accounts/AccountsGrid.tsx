import AccountCard from "./AccountCard";
import AccountsEmptyState from "./AccountsEmptyState";
import AccountsLoader from "./AccountsLoader";

const AccountsGrid = ({ accounts, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <AccountsLoader />;
  }
  
  if (!accounts?.length) {
    return <AccountsEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts?.map((acnt) => (
        <AccountCard
          key={acnt.id}
          name={acnt.name}
          balance={acnt.available_balance}
          id={acnt.id}
          onEdit={() => onEdit(acnt)}
          onDelete={() => onDelete(acnt)}
          lastTransaction={acnt.recent_transaction_amount}
          recent_transaction_type={acnt.recent_transaction_type}
        />
      ))}
    </div>
  );
};

export default AccountsGrid;