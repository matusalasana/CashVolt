import { Wallet } from "lucide-react";

const AccountsHeader = ({ accountsLength }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="text-primary" size={24} />
          <h1 className="text-3xl font-bold tracking-tight">
            Your Accounts
          </h1>
        </div>

        <p className="text-base-content/60">
          Manage your banks, cards, and cash wallets.
        </p>
      </div>

      <div className="stats shadow bg-base-100 border border-base-200">
        <div className="stat py-2 px-6">
          <div className="stat-title text-xs uppercase font-bold">
            Total Accounts
          </div>
          <div className="stat-value text-2xl text-primary">
            {accountsLength}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsHeader;