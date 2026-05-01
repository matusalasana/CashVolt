import { Loader2 } from "lucide-react";

interface Props {
  item_name?: string;
  onDelete?: () => void;
  onCancel?: () => void;
  isDeleting?: boolean;
}

const DeleteConfirmationCard = ({
  isDeleting,
  onDelete,
  onCancel,
  item_name,
}: Props) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">

        {/* Title */}
        <h3 className="font-bold text-lg">
          Confirm Deletion
        </h3>

        {/* Message */}
        <p className="py-3 text-sm text-base-content/80">
          Are you sure you want to remove{" "}
          <span className="font-medium text-error">
            {item_name || "this item"}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="modal-action">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!isDeleting) onDelete?.();
            }}
            disabled={isDeleting}
            className="btn btn-error min-w-[90px] flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
};

export default DeleteConfirmationCard;