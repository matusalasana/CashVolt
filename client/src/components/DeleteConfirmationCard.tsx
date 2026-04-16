
import { Loader2 } from "lucide-react";
interface Props{
  item_name?: string;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
}

const DeleteConfirmationCard = ({ isDeleting, onDelete, onCancel, item_name }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 animate-scale-in">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Deletion
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to remove{" "}
          <span className="font-medium text-red-500">
            {item_name || "this item"}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!isDeleting) onDelete?.();
            }}
            disabled={isDeleting}
            className="px-4 py-2 text-sm w-20 h-10 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
          { isDeleting 
            ? <Loader2 className="animate-spin mx-auto" />
            : "Delete"
            
          }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationCard