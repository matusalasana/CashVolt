import AccountForm from "./AccountForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";

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
}) => {
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
            if (!deletingAccount || isPending) return;

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