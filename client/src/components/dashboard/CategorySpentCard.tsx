import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"


interface Props {
  categories: any[];
  currency?: string;
}

const CategorySpentCard = ({ categories, currency = "ETB" }: Props) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-base-200 dark:bg-base-300 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
    
    {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-base-content">
          Recent Category spent
        </h2>

        <Link
          to="/budgets"
          className="text-sm flex items-center gap-1 text-primary hover:gap-2 transition-all duration-200"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    
      {categories.slice(0,3).map((category) => {
        const budget = category.amount;
        const spent = category.spent;
        const remaining = category.remaining;

        const percentage =
          budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

        return (
          <div
            key={category.id}
            className="rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-base-content">
                {category.category_name}
              </h3>

              <span className="text-xs text-base-content/60">
                {percentage.toFixed(0)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Values */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-base-content/60 text-xs">Spent</p>
                <p className="font-semibold">
                  {spent.toLocaleString()} {currency}
                </p>
              </div>

              <div className="text-center">
                <p className="text-base-content/60 text-xs">Budget</p>
                <p className="font-semibold">
                  {budget.toLocaleString()} {currency}
                </p>
              </div>

              <div className="text-right">
                <p className="text-base-content/60 text-xs">Remaining</p>
                <p className="font-semibold">
                  {remaining.toLocaleString()} {currency}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySpentCard;