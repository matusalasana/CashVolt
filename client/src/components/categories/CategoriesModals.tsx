import CategoryForm from "./CategoryForm";
import DeleteConfirmationCard from "../DeleteConfirmationCard";

const CategoriesModals = ({
  modals,
  deleteCategory,
  isDeleting,
}) => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,

    isEditModalOpen,
    setIsEditModalOpen,
    editingCategory,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingCategoryId,
    setDeletingCategoryId,
  } = modals;

  return (
    <>
      {/* ADD */}
      {isAddModalOpen && (
        <CategoryForm
          mode="add"
          onSuccess={() => setIsAddModalOpen(false)}
        />
      )}

      {/* EDIT */}
      {isEditModalOpen && editingCategory && (
        <CategoryForm
          mode="edit"
          category={editingCategory}
          onSuccess={() => setIsEditModalOpen(false)}
        />
      )}

      {/* DELETE */}
      {isDeleteOpen && deletingCategoryId && (
        <DeleteConfirmationCard
          item_name="category"
          isDeleting={isDeleting}
          onCancel={() => setIsDeleteOpen(false)}
          onDelete={() => {
            deleteCategory(deletingCategoryId, {
              onSuccess: () => {
                setIsDeleteOpen(false);
                setDeletingCategoryId(null);
              },
            });
          }}
        />
      )}
    </>
  );
};

export default CategoriesModals;