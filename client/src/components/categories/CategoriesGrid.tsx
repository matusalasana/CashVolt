import CategoryCard from "./CategoryCard";

const CategoriesGrid = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-20 text-base-content/60">
        No categories found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          name={cat.name}
          type={cat.type}
          onDelete={() => onDelete(cat)}
          onEdit={() => onEdit(cat)}
        />
      ))}
    </div>
  );
};

export default CategoriesGrid;