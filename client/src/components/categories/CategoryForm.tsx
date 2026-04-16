import { type CategoryInput, categorySchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCreateCategory, useUpdateCategory } from "../../hooks/useCategories";
import { Loader2, X, ArrowUpDown } from "lucide-react";

interface Props {
  category?: CategoryInput & { id: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const CategoryForm = ({ category, mode = "add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? { name: "", type: "expense" },
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (mode === "edit" && category) {
      reset(category);
    } else {
      reset({ name: "", type: "expense" });
    }
  }, [category, mode, reset]);

  const onFormSubmit = (data: CategoryInput) => {
    if (mode === "edit" && category) {
      updateCategory(
        { id: category.id, data },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          reset({ name: "", type: "expense" });
          onSuccess?.();
        },
      });
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">

        {/* Close button */}
        <button
          onClick={onSuccess}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

          {/* name */}
          <div>
            <input
              type="text"
              placeholder="Category name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* type */}
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <ArrowUpDown size={14} /> Type
              </span>
            </label>

            <select
              className={`select select-bordered w-full ${
                errors.type ? "select-error" : ""
              }`}
              {...register("type")}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : mode === "edit" ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;