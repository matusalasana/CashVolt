import { type AccountInput, accountSchema} from "../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAccount, useUpdateAccount } from "../hooks/useAccounts"

interface Props{
  account?: AccountInput | null;
  mode?: "add" | "edit"
  onSuccess?: () => void
}

const AccountForm = ({account, mode, onSuccess}: Props) => {
  
  const { mutate: createAccount } = useCreateAccount()
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { isSubmitting, errors }
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: mode === "edit" && account
      ? account
      : {
          name: ""
        
        }
  })
  
  const onFormSubmit = (data: AccountInput) => {
    if(mode === "edit" && account){
      alert("Submitted")
    } else{
      createAccount(data)
      reset ()
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="text"
          placeholder="Account name"
          className="border-2 border-gray-200 px-2 py-1 rounded-lg"
          {... register("name")}
        />
        <button type="submit"> 
Submit 
        </button>
      </form>
    </div>
  )
}

export default AccountForm