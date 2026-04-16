import BudgetAnalyticsCard from "./BudgetAnalyticsCard";

type AnalyticsData = {
  category_name: string;
  amount: number;
  spent: number;
  remaining: number;
  month: number;
  year: number;
};

type AnalyticsGridProps = {
  data: AnalyticsData[];
};

const AnalyticsGrid = ({ data }: AnalyticsGridProps) => {
  if (!data?.length) {
    return (
      <div className="text-center py-20 text-base-content/60">
        No analytics found for this period.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((b, index) => (
        <BudgetAnalyticsCard
          key={`${b.category_name}-${b.month}-${b.year}-${index}`}
          name={b.category_name}
          spent={b.spent}
          budget={b.amount}
          remaining={b.remaining}
          month={b.month}
          year={b.year}
        />
      ))}
    </div>
  );
};

export default AnalyticsGrid;