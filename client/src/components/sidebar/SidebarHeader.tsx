import { Zap } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6 px-2">
        <div className="btn btn-primary btn-square btn-sm shadow-md">
          <Zap size={18} className="text-amber-500" />
        </div>

        <div className="leading-tight">
          <h1 className="text-lg font-bold tracking-tight">
            CashVolt
          </h1>
          <p className="text-[11px] text-base-content opacity-50 tracking-widest">
            Clarity in every transaction
          </p>
        </div>
      </div>
  )
}

export default SidebarHeader