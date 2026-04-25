import CategoryCard from "./CategoryCard";
import CategoryLoader from "./CategoryLoader";

const CategoriesGrid = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <CategoryLoader />;
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