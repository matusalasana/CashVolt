import { X } from "lucide-react";

interface Props {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const TransactionsFilters = ({ selectedType, setSelectedType }: Props) => {
  const filters = [
    { value: "", label: "All"},
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
    { value: "savings", label: "Savings" },
  ];

  const getActiveStyle = (value: string) => {
    switch (value) {
      case "income":
        return "bg-success text-success-content shadow-sm";
      case "expense":
        return "bg-error text-error-content shadow-sm";
      case "savings":
        return "bg-warning text-warning-content shadow-sm";
      default:
        return "bg-primary text-primary-content shadow-sm";
    }
  };

  return (
    <div className="relative flex flex-wrap items-center gap-2 md:gap-3 p-5">

      {/* glass background */}
      <div className="absolute inset-0 bg-base-100/60 backdrop-blur-xl rounded-2xl border border-base-200 -z-10" />

      {filters.map((filter) => {
        const isSelected = selectedType === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => setSelectedType(filter.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl
              text-sm font-medium
              transition-all duration-300
              ${
                isSelected
                  ? getActiveStyle(filter.value)
                  : "bg-base-200 text-base-content/70 hover:bg-base-300"
              }
              ${isSelected ? "scale-[1.03]" : "hover:scale-[1.02] active:scale-95"}
            `}
          >
            {filter.label}
          </button>
        );
      })}

      {/* clear button */}
      {selectedType && (
        <button
          onClick={() => setSelectedType("")}
          className="p-2 flex gap-1 justify-center items-center rounded-xl bg-base-200 hover:bg-base-300 text-base-content/60 font-bold hover:text-base-content transition-all duration-300 hover:rotate-90 active:scale-95"
          aria-label="Clear filters"
        >
          <span className="text-xs">Clear filter</span> <X size={14} />
        </button>
      )}
    </div>
  );
};

export default TransactionsFilters;