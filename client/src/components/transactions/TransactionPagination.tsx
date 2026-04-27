import { ChevronLeft, ChevronRight } from "lucide-react";

const TransactionPagination = ({
  onClickNext,
  transactions,
  onClickPrevious,
  pageNumber,
  isLastPage,
  isFirstPage,
}) => {
  if (!transactions || transactions.length < 10) return null;

  return (
    <div className="flex justify-center items-center py-6 md:py-8">
      <div className="group relative overflow-hidden rounded-xl backdrop-blur-md bg-base-100/30 border border-base-300 shadow-lg transition-all duration-300 hover:shadow-xl">

        {/* Glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-base-300/40" />

        {/* Content */}
        <div className="relative flex items-center gap-2 md:gap-3 p-2 md:p-2.5">

          {/* Previous Button */}
          <button
            onClick={onClickPrevious}
            disabled={isFirstPage}
            className={`
              flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg
              transition-all duration-200
              ${
                isFirstPage
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-base-200 hover:scale-95 active:scale-90 cursor-pointer"
              }
              backdrop-blur-sm bg-base-100/20
              border border-base-300
              text-base-content
            `}
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          {/* Page Number */}
          <div className="min-w-[70px] md:min-w-[80px] text-center">
            <span className="text-sm md:text-base font-medium text-base-content/70">
              Page
            </span>

            <span className="mx-1.5 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {pageNumber}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={onClickNext}
            disabled={isLastPage}
            className={`
              flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg
              transition-all duration-200
              ${
                isLastPage
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-base-200 hover:scale-95 active:scale-90 cursor-pointer"
              }
              backdrop-blur-sm bg-base-100/20
              border border-base-300
              text-base-content
            `}
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default TransactionPagination;