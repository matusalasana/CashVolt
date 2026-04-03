import { useState } from 'react';
import { Plus, X, Wallet, ArrowRightLeft } from "lucide-react";
import AccountForm from "../components/AccountForm";
import { useAccounts, useDeleteAccount } from "../hooks/useAccounts";
import AccountCard from "../components/AccountCard";

const Accounts = () => {
  const { data: accounts, isLoading } = useAccounts();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [editingAccount, setEditingAccount] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen">
      
      {/* Header & Stats Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="text-primary" size={24} />
            <h1 className="text-3xl font-bold tracking-tight">Your Accounts</h1>
          </div>
          <p className="text-base-content/60">Manage your banks, cards, and cash wallets.</p>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat py-2 px-6">
            <div className="stat-title text-xs uppercase font-bold">Total Accounts</div>
            <div className="stat-value text-2xl text-primary">{accounts?.length || 0}</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mb-6">
        <button 
          onClick={() => setIsAddOpen(true)} 
          className="btn btn-primary gap-2 shadow-md"
        >
          <Plus size={20} />
          Add New Account
        </button>
      </div>

      {/* Accounts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full bg-base-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts?.map((acnt) => (
            <AccountCard 
              key={acnt.id}
              name={acnt.name}
              id={acnt.id}
              onEdit={() => {
                setEditingAccount(acnt);
                setIsEditOpen(true);
              }}
              onDelete={() => {
                if(window.confirm("Are you sure you want to delete this account?")) {
                  deleteAccount(acnt.id);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Add Account Modal */}
      {isAddOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
             <button 
              onClick={() => setIsAddOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
            >
              <X size={20} />
            </button>
            <AccountForm
              mode="add"
              onSuccess={() => setIsAddOpen(false)}
            />
          </div>
          <div className="modal-backdrop bg-base-900/40 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
        </div>
      )}

      {/* Edit Account Modal */}
      {isEditOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
            <button 
              onClick={() => {
                setIsEditOpen(false);
                setEditingAccount(null);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
            >
              <X size={20} />
            </button>
            <AccountForm
              mode="edit"
              account={editingAccount}
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingAccount(null);
              }}
            />
          </div>
          <div className="modal-backdrop bg-base-900/40 backdrop-blur-sm" onClick={() => setIsEditOpen(false)}></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && accounts?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
          <ArrowRightLeft className="text-base-content/20 mb-4" size={48} />
          <p className="text-xl font-medium text-base-content/50">No accounts found</p>
          <button onClick={() => setIsAddOpen(true)} className="btn btn-link btn-primary">Create your first one</button>
        </div>
      )}
    </div>
  );
};

export default Accounts;
