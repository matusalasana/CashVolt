import SavingsForm from "./SavingsForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";
import { type SavingsInput } from "../../types";
import { type UseMutateFunction } from "@tanstack/react-query";

interface SavingsModalsProps {
  isAddOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;

  editingSavings: (SavingsInput & { id?: number }) | null;
  deletingSavings: (SavingsInput & { id?: number }) | null;

  setIsAddOpen: (open: boolean) => void;
  setIsEditOpen: (open: boolean) => void;
  setIsDeleteOpen: (open: boolean) => void;

  setEditingSavings: (
    savings: (SavingsInput & { id?: number }) | null
  ) => void;

  setDeletingSavings: (
    savings: (SavingsInput & { id?: number }) | null
  ) => void;

  deleteSavings: UseMutateFunction<
    unknown, // data
    unknown, // error
    number   // variables (id)
  >;

  isPending: boolean;
}

const SavingsModals = ({
  isAddOpen,
  isEditOpen,
  isDeleteOpen,

  editingSavings,
  deletingSavings,

  setIsAddOpen,
  setIsEditOpen,
  setIsDeleteOpen,
  setEditingSavings,
  setDeletingSavings,

  deleteSavings,
  isPending,
}: SavingsModalsProps) => {
  return (
    <>
      {/* ADD */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
            <SavingsForm
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
      {isEditOpen && editingSavings && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-md bg-transparent border-none relative">
            <SavingsForm
              mode="edit"
              savings={editingSavings}
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingSavings(null);
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
      {isDeleteOpen && deletingSavings && (
        <DeleteConfirmationCard
          isDeleting={isPending}
          item_name={deletingSavings.title}
          onCancel={() => {
            setIsDeleteOpen(false);
            setDeletingSavings(null);
          }}
          onDelete={() => {
            if (!deletingSavings?.id) return;

            deleteSavings(deletingSavings.id, {
              onSuccess: () => {
                setDeletingSavings(null);
                setIsDeleteOpen(false);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default SavingsModals;