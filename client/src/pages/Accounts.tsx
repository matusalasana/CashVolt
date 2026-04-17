import { useAccounts, useDeleteAccount } from "../hooks/useAccounts";
import { useAccountModals } from "../components/accounts/useAccountModals";

import AccountsHeader from "../components/accounts/AccountsHeader";
import AccountsGrid from "../components/accounts/AccountsGrid";
import AccountsEmptyState from "../components/accounts/AccountsEmptyState";
import AccountModals from "../components/accounts/AccountModals";

const Accounts = () => {
  const { data: accounts, isLoading } = useAccounts();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const modals = useAccountModals();

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen">
      
      <AccountsHeader 
        accountsLength={accounts?.length || 0} 
        onAdd={() => modals.setIsAddOpen(true)} // Pass onAdd prop
      />
      <AccountsGrid
        accounts={accounts}
        isLoading={isLoading}
        onEdit={(acnt) => {
          modals.setEditingAccount(acnt);
          modals.setIsEditOpen(true);
        }}
        onDelete={(acnt) => {
          modals.setDeletingAccount(acnt);
          modals.setIsDeleteOpen(true);
        }}
      />

      {!isLoading && accounts?.length === 0 && <AccountsEmptyState />}

      <AccountModals
        {...modals}
        deleteAccount={deleteAccount}
        isPending={isPending}
      />
    </div>
  );
};

export default Accounts;