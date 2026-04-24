import AccountCard from "./AccountCard";
import AccountsEmptyState from "./AccountsEmptyState";

const AccountsGrid = ({ accounts, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
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
          id={acnt.id}
          onEdit={() => onEdit(acnt)}
          onDelete={() => onDelete(acnt)}
        />
      ))}
    </div>
  );
};

export default AccountsGrid;