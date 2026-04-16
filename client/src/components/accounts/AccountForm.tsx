import { type AccountInput, accountSchema } from "../../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useCreateAccount, useUpdateAccount } from "../../hooks/useAccounts"
import { Loader2, X } from "lucide-react";

interface Props {
  account?: AccountInput & { id: number }
  mode?: "add" | "edit"
  onSuccess?: () => void
}

const AccountForm = ({ account, mode, onSuccess }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: ""
    }
  })
  
  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (account) {
      reset(account)
    }
  }, [account, reset])

  useEffect(() => {
    if (mode === "edit" && account) {
      reset({
        name: account.name
      })
    }else{
      reset()
    }
  }, [account, mode, reset])

  const onFormSubmit = (data: AccountInput) => {
    if (mode === "edit" && account) {
      updateAccount(
        {id: account.id, data: data},
        {onSuccess: () => onSuccess?.()}
      );
    } 
    else {
      createAccount(data,{
        onSuccess: () => {
          reset();
          onSuccess?.();
        }
      })
    }
  }
  

  return (
    <div className="relative">
    <X 
      size={20}
      onClick={onSuccess}
      className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50"
    />
    <form
  onSubmit={handleSubmit(onFormSubmit)}
  className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-100"
>
  {/* Title */}
  <h2 className="text-lg font-semibold text-gray-800">
    {mode === "edit" ? "Edit Account" : "Create Account"}
  </h2>

  {/* Input */}
  <div className="space-y-1">
    <input
      type="text"
      placeholder="Account name"
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

  {/* Button */}
  <button
    type="submit"
    disabled={isPending}
    className="btn btn-primary btn-block md:btn-wide"
  >
    { isPending ? <Loader2 className="animate-spin" />
      : mode==="edit" ? "Update Account"
      : "Add Account"
    }
  </button>
</form>
</div>
  )
}

export default AccountForm