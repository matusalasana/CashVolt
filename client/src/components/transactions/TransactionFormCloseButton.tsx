import { X } from "lucide-react";

interface CloseButonProps {
  onSuccess?: () => void;
}

const TransactionFormCloseButton = ({onSuccess}: CloseButonProps) => {
  return (
    <button
      type="button"
      onClick={onSuccess}
      className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
    >
      <X size={18} />
    </button>
  )
}

export default TransactionFormCloseButton