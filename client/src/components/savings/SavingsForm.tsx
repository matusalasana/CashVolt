import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

// Internal imports
import { type SavingsInput, savingsSchema } from "../../types";
import { useCreateSavings, useUpdateSavings } from "../../hooks/useSavings";

interface Props {
  savings?: SavingsInput & { id?: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const SavingsForm = ({ savings, mode="add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SavingsInput>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      title: savings?.title || "",
      target_amount: savings?.target_amount || undefined,
      due_date: savings?.due_date || "",
    },
  });

  const { mutate: createSavings, isPending: isCreating } = useCreateSavings();
  const { mutate: updateSavings, isPending: isUpdating } = useUpdateSavings();

  const isPending = isCreating || isUpdating;

  // Reset form when savings or mode changes
  useEffect(() => {
    if (mode === "edit" && savings) {
      reset({
        title: savings.title,
        target_amount: savings.target_amount,
        due_date: savings.due_date || "",
      });
    } else if (mode !== "edit") {
      reset({
        title: "",
        target_amount: undefined,
        due_date: "",
      });
    }
  }, [savings, mode, reset]);

  const onFormSubmit = (data: SavingsInput) => {
    if (mode === "edit" && savings) {
      updateSavings(
        { id: savings.id, data },
        {
          onSuccess: () => onSuccess?.(),
        }
      );
    } else {
      createSavings(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    }
  };

  const handleClose = () => {
    onSuccess?.();
  };

  return (
    <div className="relative">
      <X
        size={20}
        onClick={handleClose}
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
        aria-label="Close form"
      />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-xl p-6 border border-base-200 flex flex-col items-center gap-3"
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {mode === "edit" ? "Edit Savings Goal" : "Create Savings Goal"}
        </h2>

        {/* Title Input */}
        <div className="space-y-1 w-full">
          <input
            type="text"
            placeholder="Savings title"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
          />

          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Target Amount */}
        <div className="space-y-1 w-full">
          <input
            type="number"
            placeholder="Target amount"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            {...register("target_amount", { valueAsNumber: true })}
            aria-invalid={errors.target_amount ? "true" : "false"}
          />

          {errors.target_amount && (
            <p className="text-red-500 text-sm">
              {errors.target_amount.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div className="space-y-1 w-full">
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            {...register("due_date")}
            aria-invalid={errors.due_date ? "true" : "false"}
          />

          {errors.due_date && (
            <p className="text-red-500 text-sm">
              {errors.due_date.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary btn-block md:btn-wide"
          aria-busy={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : mode === "edit" ? (
            "Update Savings"
          ) : (
            "Create Savings"
          )}
        </button>
      </form>
    </div>
  );
};

SavingsForm.displayName = "SavingsForm";

export default SavingsForm;