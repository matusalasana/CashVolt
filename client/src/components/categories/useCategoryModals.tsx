import { useState } from "react";

export const useCategoryModals = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return {
    isAddModalOpen,
    setIsAddModalOpen,

    isEditModalOpen,
    setIsEditModalOpen,

    editingCategory,
    setEditingCategory,

    deletingCategoryId,
    setDeletingCategoryId,

    isDeleteOpen,
    setIsDeleteOpen,
  };
};