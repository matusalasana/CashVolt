import { useState } from "react";
import { useCategories, useDeleteCategory } from "../hooks/useCategories";
import { useCategoryModals } from "../components/categories/useCategoryModals";

import CategoriesHeader from "../components/categories/CategoriesHeader";
import CategoriesFilters from "../components/categories/CategoriesFilters";
import CategoriesGrid from "../components/categories/CategoriesGrid";
import CategoriesModals from "../components/categories/CategoriesModals";

const Categories = () => {
  const [categoryType, setCategoryType] = useState("");

  const { data: categories, isLoading } = useCategories(categoryType);
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const modals = useCategoryModals();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      <CategoriesHeader
        onAdd={() => {
          modals.setIsEditModalOpen(false);
          modals.setEditingCategory(null);
          modals.setIsAddModalOpen(true);
        }}
      />

      <CategoriesFilters
        categoryType={categoryType}
        setCategoryType={setCategoryType}
      />

      <CategoriesGrid
        categories={categories}
        isLoading={isLoading}
        onEdit={(cat) => {
          modals.setIsEditModalOpen(true);
          modals.setEditingCategory(cat);
        }}
        onDelete={(cat) => {
          modals.setDeletingCategoryId(cat.id);
          modals.setIsDeleteOpen(true);
        }}
      />

      <CategoriesModals
        modals={modals}
        deleteCategory={deleteCategory}
        isDeleting={isPending}
      />
    </div>
  );
};

export default Categories;