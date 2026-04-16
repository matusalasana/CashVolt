const CategoriesHeader = ({ onAdd }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">Categories</h1>

      <button className="btn btn-primary" onClick={onAdd}>
        + Add Category
      </button>
    </div>
  );
};

export default CategoriesHeader;