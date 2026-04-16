import { useState } from "react";

export const useTransactionModals = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return {
    editingTransaction,
    setEditingTransaction,

    deletingTransaction,
    setDeletingTransaction,

    isAddOpen,
    setIsAddOpen,

    isEditOpen,
    setIsEditOpen,

    isDeleteOpen,
    setIsDeleteOpen,
  };
};