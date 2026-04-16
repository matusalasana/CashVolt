import { ArrowRightLeft } from "lucide-react";

const AccountsEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
      <ArrowRightLeft className="text-base-content/20 mb-4" size={48} />
      <p className="text-xl font-medium text-base-content/50">
        No accounts found
      </p>
    </div>
  );
};

export default AccountsEmptyState;