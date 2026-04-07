import { type CategoryInput, categorySchema } from "../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useCreateCategory, useUpdateCategory } from "../hooks/useCategories"
import { Loader2, X, ArrowUpDown } from "lucide-react";

interface Props {
  category?: CategoryInput & { id: number }
  mode?: "add" | "edit"
  onSuccess?: () => void
}

const CategoryForm = ({ category, mode = "add", onSuccess }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? undefined
  })

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (mode === "edit" && category) {
      reset(category)
    } else {
      reset()
    }
  }, [category, mode, reset])

  const onFormSubmit = (data: CategoryInput) => {
    if (mode === "edit" && category) {
      updateCategory(
        { id: category.id, data },
        { onSuccess: () => onSuccess?.() }
      )
    } else {
      createCategory(data, {
        onSuccess: () => {
          reset()
          onSuccess?.()
        }
      })
    }
  }

  return (
    <div className="relative">

      <X
        size={20}
        onClick={() => onSuccess?.()}
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
      />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          {mode === "edit" ? "Edit Category" : "Create Category"}
        </h2>

        {/* name */}
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Category name"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* type */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
              <ArrowUpDown size={14} /> Transaction Type
            </span>
          </label>

          <select
            className={`select select-bordered w-full ${errors.type ? "select-error" : ""}`}
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
          className="btn btn-primary btn-block md:btn-wide"
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
  )
}

export default CategoryForm