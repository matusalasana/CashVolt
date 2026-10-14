import { Search, X } from "lucide-react"

interface SearchProps {
  onSearch?: (searchText: string) => void;
  onClearSearch?: () => void;
}

const TransactionSearch = ({ onSearch, onClearSearch }: SearchProps) => {

  const handleSearchChange = (e: HTMLInputElement) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative group">
        <input
          onChange={handleSearchChange}
          type="text"
          placeholder="Search transactions..."
          className="
            w-full 
            rounded-full 
            bg-base-100 
            pl-11 pr-4 py-2.5
            text-sm
            border border-base-300
            focus:outline-none 
            focus:ring-2 
            focus:ring-primary/30 
            focus:border-primary
            transition-all duration-200
            placeholder:text-base-content/40
          "
        />
        
        <Search
          size={18}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-base-content/40
            group-focus-within:text-primary
            transition-colors duration-200
          "
        />
        <X
          size={18}
          onClick={onClearSearch}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-rose-600/60
            transition-colors duration-200
          "
        />
      </div>
    </div>
  );
};

export default TransactionSearch;