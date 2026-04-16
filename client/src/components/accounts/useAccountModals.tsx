import { useState } from "react";

export const useAccountModals = () => {
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [deletingAccount, setDeletingAccount] = useState<any>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return {
    editingAccount,
    deletingAccount,
    isEditOpen,
    isAddOpen,
    isDeleteOpen,

    setEditingAccount,
    setDeletingAccount,
    setIsEditOpen,
    setIsAddOpen,
    setIsDeleteOpen,
  };
};