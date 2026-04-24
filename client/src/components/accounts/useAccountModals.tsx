import { useState } from "react";
import { type AccountInput } from "../../types";

interface UseAccountModalsReturn {
  editingAccount: AccountInput | null;
  deletingAccount: AccountInput | null;
  
  isEditOpen: boolean;
  isAddOpen: boolean;
  isDeleteOpen: boolean;
  
  setEditingAccount: (account: AccountInput | null) => void;
  setDeletingAccount: (account: AccountInput | null) => void;
  
  setIsEditOpen: (open: boolean) => void;
  setIsAddOpen: (open: boolean) => void;
  setIsDeleteOpen: (open: boolean) => void;
}

export const useAccountModals = (): UseAccountModalsReturn => {
  const [editingAccount, setEditingAccount] = useState<AccountInput | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<AccountInput | null>(null);

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