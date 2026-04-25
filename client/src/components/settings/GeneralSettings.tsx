import { Banknote, Globe, ChevronDown } from "lucide-react";

const selectBase =
  "select select-bordered w-40 pr-10 font-semibold text-indigo-600 bg-base-100 focus:outline-none focus:ring-2 focus:ring-indigo-200";

const GeneralSettings = () => {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
          General
        </h2>
      </div>

      <div className="space-y-2">

        {/* Currency */}
        <div className="group flex items-center justify-between rounded-2xl bg-base-100 px-4 py-3 border border-base-300 shadow-sm hover:bg-base-200 ">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-indigo-600">
              <Banknote size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content">
                Default Currency
              </h3>
              <p className="text-xs text-base-content/70">
                Global balances
              </p>
            </div>
          </div>

          <div className="relative">
            <select className={selectBase}>
              <option value="etb">ETB</option>
              <option value="usd">USD ($)</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
            />
          </div>
        </div>

        {/* Language */}
        <div className="group flex items-center justify-between rounded-2xl bg-base-100 px-4 py-3 border border-base-300 shadow-sm hover:bg-base-200 ">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-indigo-600">
              <Globe size={20} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content">
                App Language
              </h3>
              <p className="text-xs text-base-content/70">
                System language
              </p>
            </div>
          </div>

          <div className="relative">
            <select className={selectBase}>
              <option value="english">English</option>
              <option value="amharic">Amharic</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeneralSettings;