import { PlusCircle, Save } from "lucide-react";

interface TitleProps {
  mode: string;
}

const TransactionFormTitle = ({mode}: TitleProps) => {
  return (
    <h2 className="card-title flex items-center gap-2 text-2xl mb-4">
      {mode === "edit" ? (
        <>
          <Save className="text-primary" /> Edit Transaction
        </>
      ) : (
        <>
          <PlusCircle className="text-success" /> Add Transaction
        </>
      )}
    </h2>
  )
}

export default TransactionFormTitle