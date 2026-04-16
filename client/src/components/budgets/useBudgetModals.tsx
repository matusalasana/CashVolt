import { useState } from "react";

export const useBudgetModals = () => {
  const [editingBudget, setEditingBudget] = useState(null);
  const [deletingBudget, setDeletingBudget] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return {
    editingBudget,
    setEditingBudget,

    deletingBudget,
    setDeletingBudget,

    isAddOpen,
    setIsAddOpen,

    isEditOpen,
    setIsEditOpen,

    isDeleteOpen,
    setIsDeleteOpen,
  };
};