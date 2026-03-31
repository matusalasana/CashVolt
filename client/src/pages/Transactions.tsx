import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";

const Transaction = () => {
  const { data: transactions } = useTransactions();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // OPEN CREATE
  const handleAdd = () => {
    setSelectedTransaction(null);
    (document.getElementById("tx_modal") as HTMLDialogElement).showModal();
  };

  // OPEN UPDATE
  const handleEdit = (tx: any) => {
    setSelectedTransaction(tx);
    (document.getElementById("tx_modal") as HTMLDialogElement).showModal();
  };

  // CLOSE
  const handleClose = () => {
    (document.getElementById("tx_modal") as HTMLDialogElement).close();
  };

  return (
    <div>
      {/* Add Button */}
      <button onClick={handleAdd} className="btn btn-primary mb-4">
        Add Transaction
      </button>

      {/* Transactions */}
      {transactions?.map((tx) => (
        <div key={tx.id} className="flex justify-between border p-2 mb-2">
          <span>{tx.description}</span>

          <button
            onClick={() => handleEdit(tx)}
            className="btn btn-sm"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTransaction(tx.id)}
            className="btn btn-sm"
          >
            Delete 
          </button>
        </div>
      ))}

      {/* ✅ DaisyUI Modal */}
      <dialog id="tx_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
          </h3>

          <TransactionForm
            mode={selectedTransaction ? "update" : "create"}
            transaction={selectedTransaction}
            onSuccess={handleClose}
          />

          {/* Close button */}
          <div className="modal-action">
            <button onClick={handleClose} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Transaction;