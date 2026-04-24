import AccountForm from "./AccountForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";
import { type AccountInput } from "../../types";
import { type UseMutateFunction } from "@tanstack/react-query";

interface AccountModalsProps {
  isAddOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  editingAccount: AccountInput | null;
  deletingAccount: AccountInput | null;
  setIsAddOpen: (open: boolean) => void;
  setIsEditOpen: (open: boolean) => void;
  setIsDeleteOpen: (open: boolean) => void;
  setEditingAccount: (account: AccountInput | null) => void;
  setDeletingAccount: (account: AccountInput | null) => void;
  deleteAccount: UseMutateFunction<
    unknown,  // data
    unknown,  // error
    number    // variables (id)
  >;
  isPending: boolean;
}

const AccountModals = ({
  isAddOpen,
  isEditOpen,
  isDeleteOpen,

  editingAccount,
  deletingAccount,

  setIsAddOpen,
  setIsEditOpen,
  setIsDeleteOpen,
  setEditingAccount,
  setDeletingAccount,

  deleteAccount,
  isPending,
}: AccountModalsProps) => {
  return (
    <>
      {/* ADD */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
            <AccountForm
              mode="add"
              onSuccess={() => setIsAddOpen(false)}
            />
          </div>

          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={() => setIsAddOpen(false)}
          />
        </div>
      )}

      {/* EDIT */}
      {isEditOpen && editingAccount && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
            <AccountForm
              mode="edit"
              account={editingAccount}
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingAccount(null);
              }}
            />
          </div>

          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={() => setIsEditOpen(false)}
          />
        </div>
      )}

      {/* DELETE */}
      {isDeleteOpen && deletingAccount && (
        <DeleteConfirmationCard
          isDeleting={isPending}
          item_name={deletingAccount.name}
          onCancel={() => {
            setIsDeleteOpen(false);
            setDeletingAccount(null);
          }}
          onDelete={() => {
            if (!deletingAccount) return;

            deleteAccount(deletingAccount.id, {
              onSuccess: () => {
                setDeletingAccount(null);
                setIsDeleteOpen(false);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default AccountModals;