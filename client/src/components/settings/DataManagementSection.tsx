import { FileSpreadsheet, FileText } from "lucide-react";

const DataManagementSection = () => {
  return (
    <div className="mx-auto w-full p-4">
      <div className="mb-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
          Data Management
        </h2>
      </div>

      <div className="flex gap-3">

        {/* Export CSV */}
        <button className="group flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-base-100 py-6 shadow-sm border border-base-300 hover:bg-base-200 hover:shadow-md active:scale-[0.98]">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover:scale-105">
            <FileSpreadsheet size={22} strokeWidth={2.2} />
          </div>

          <span className="text-sm font-semibold text-base-content">
            CSV
          </span>
        </button>

        {/* Export PDF */}
        <button className="group flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-base-100 py-6 shadow-sm border border-base-300 hover:bg-base-200 hover:shadow-md active:scale-[0.98]">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 group-hover:scale-105">
            <FileText size={22} strokeWidth={2.2} />
          </div>

          <span className="text-sm font-semibold text-base-content">
            PDF
          </span>
        </button>

      </div>
    </div>
  );
};

export default DataManagementSection;