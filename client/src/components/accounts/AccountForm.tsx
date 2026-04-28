// External imports
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

// Internal imports
import { type AccountInput, accountSchema } from "../../types";
import { useCreateAccount, useUpdateAccount } from "../../hooks/useAccounts";

interface Props {
  account?: AccountInput & { id?: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const AccountForm = ({ account, mode, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name:account?.name || "",
    },
  });

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();
  const isPending = isCreating || isUpdating;

  // Reset form when account or mode changes
  useEffect(() => {
    if (mode === "edit" && account) {
      reset({ name: account.name });
    } else if (mode !== "edit") {
      reset();
    }
  }, [account, mode, reset]);

  const onFormSubmit = (data: AccountInput) => {
    if (mode === "edit" && account) {
      updateAccount(
        { id: account.id, data: data },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createAccount(data, {
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
        <h2 className="text-lg font-semibold text-base-content">
          {mode === "edit" ? "Edit Account" : "Create Account"}
        </h2>

        {/* Input */}
        <div className="space-y-1 w-full">
          <input
            type="text"
            placeholder="Account name"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
            {...register("name")}
            aria-label="Account name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />

          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary btn-block md:btn-wide"
          aria-label={mode === "edit" ? "Update account" : "Create account"}
          aria-busy={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : mode === "edit" ? (
            "Update Account"
          ) : (
            "Add Account"
          )}
        </button>
      </form>
    </div>
  );
};

AccountForm.displayName = "AccountForm";

export default AccountForm;