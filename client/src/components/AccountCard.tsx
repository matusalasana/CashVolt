import { Pencil, Trash2, Wallet } from "lucide-react"

interface Props {
  name: string
  id: string | number
  onEdit?: () => void
  onDelete?: () => void
}

const AccountCard = ({ name, id, onEdit, onDelete }: Props) => {
  // Get the first letter for a nice placeholder avatar
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="card card-side bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all duration-200 group">
      {/* Left side Icon/Avatar Section */}
      <figure className="p-4 pr-0">
        <div className="avatar placeholder">
          <div className="bg-primary/10 text-primary rounded-xl w-12">
            <span className="text-xl flex justify-center items-center font-bold">{initial}</span>
          </div>
        </div>
      </figure>

      <div className="card-body p-4 flex-row items-center justify-between">
        {/* Middle content */}
        <div className="flex flex-col">
          <h2 className="card-title text-base mb-0 leading-tight">{name}</h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Ref: {id}</span>
          </div>
        </div>

        {/* Action buttons - appear slightly more prominently on hover */}
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="btn btn-ghost btn-sm btn-square text-info hover:bg-info/10 transition-colors"
            title="Edit Account"
          >
            <Pencil size={18} />
          </button>

          <div className="divider divider-horizontal mx-0 h-8 opacity-20"></div>

          <button
            onClick={onDelete}
            className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10 transition-colors"
            title="Delete Account"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountCard
