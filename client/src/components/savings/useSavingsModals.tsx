import { useState } from "react";
import { type SavingsInput } from "../../types";

interface UseSavingsModalsReturn {
  editingSavings: (SavingsInput & { id?: number }) | null;
  deletingSavings: (SavingsInput & { id?: number }) | null;

  isEditOpen: boolean;
  isAddOpen: boolean;
  isDeleteOpen: boolean;

  setEditingSavings: (
    savings: (SavingsInput & { id?: number }) | null
  ) => void;

  setDeletingSavings: (
    savings: (SavingsInput & { id?: number }) | null
  ) => void;

  setIsEditOpen: (open: boolean) => void;
  setIsAddOpen: (open: boolean) => void;
  setIsDeleteOpen: (open: boolean) => void;
}

export const useSavingsModals = (): UseSavingsModalsReturn => {
  const [editingSavings, setEditingSavings] = useState<
    (SavingsInput & { id?: number }) | null
  >(null);

  const [deletingSavings, setDeletingSavings] = useState<
    (SavingsInput & { id?: number }) | null
  >(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return {
    editingSavings,
    deletingSavings,

    isEditOpen,
    isAddOpen,
    isDeleteOpen,

    setEditingSavings,
    setDeletingSavings,

    setIsEditOpen,
    setIsAddOpen,
    setIsDeleteOpen,
  };
};