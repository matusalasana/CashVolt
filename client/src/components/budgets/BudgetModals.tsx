import BudgetForm from "./BudgetForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";
import { useDeleteBudget } from "../../hooks/useBudgets";

type BudgetType = {
  id: number;
  amount: number;
  category_id: number;
  category_name?: string;
  month: number;
  year: number;
};

type BudgetModalsProps = {
  modals: {
    isAddOpen: boolean;
    setIsAddOpen: (open: boolean) => void;
    isEditOpen: boolean;
    setIsEditOpen: (open: boolean) => void;
    editingBudget: BudgetType | null;
    setEditingBudget: (budget: BudgetType | null) => void;
    isDeleteOpen: boolean;
    setIsDeleteOpen: (open: boolean) => void;
    deletingBudget: BudgetType | null;
    setDeletingBudget: (budget: BudgetType | null) => void;
  };
};

const BudgetModals = ({ modals }: BudgetModalsProps) => {
  const {
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    editingBudget,
    setEditingBudget,
    isDeleteOpen,
    setIsDeleteOpen,
    deletingBudget,
    setDeletingBudget,
  } = modals;

  const { mutate: deleteBudget, isPending: isDeleting } = useDeleteBudget();

  return (
    <>
      {/* ADD */}
      {isAddOpen && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <BudgetForm
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
      {isEditOpen && editingBudget && (
        <div className="modal modal-open animate-in fade-in duration-300">
          <div className="modal-box p-0 max-w-lg bg-transparent border-none shadow-none relative">
            <BudgetForm
              mode="edit"
              budget={editingBudget}
              onSuccess={() => {
                setIsEditOpen(false);
                setEditingBudget(null);
              }}
            />
          </div>
          <div
            className="modal-backdrop bg-base-900/40 backdrop-blur-sm"
            onClick={() => {
              setIsEditOpen(false);
              setEditingBudget(null);
            }}
          />
        </div>
      )}

      {/* DELETE */}
      {isDeleteOpen && deletingBudget && (
        <DeleteConfirmationCard
          item_name={`Budget for ${deletingBudget.category_name || 'category'}`}
          isDeleting={isDeleting}
          onCancel={() => {
            setIsDeleteOpen(false);
            setDeletingBudget(null);
          }}
          onDelete={() => {
            deleteBudget(deletingBudget.id, {
              onSuccess: () => {
                setIsDeleteOpen(false);
                setDeletingBudget(null);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default BudgetModals;