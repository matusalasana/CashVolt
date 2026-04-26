import { Doughnut } from "react-chartjs-2";
import { pieOptions, chartBgColors } from "../../utils/chart";
import { useBudgetAnalytics } from "../../hooks/useAnalytics";
import { useBudgets } from "../../hooks/useBudgets";

const CategoryPieChart = () => {
  const { data: categoriesData, isLoading: analyticsLoading } = useBudgetAnalytics(4, 2026);
  const { isLoading: budgetLoading } = useBudgets(4, 2026);
  
  const labelsOfCategories = categoriesData?.slice(0,5).filter(cat => cat.spent > 0).map(c => c.category_name);
  const categoriesSpent = categoriesData?.slice(0,5).filter(cat => cat.spent > 0).map(c => c.spent);

  const hasData = categoriesSpent?.length > 0
  
  if(!hasData){
    return null;
  }
  
  if (analyticsLoading || budgetLoading) {
    return <p>Loading...</p>;
  }
  
  return (
      <div className="card bg-base-100 shadow-xl p-6 h-[350px]">
        <h2 className="text-xl font-bold mb-4">
          Expense Breakdown
        </h2>

        <div className="h-full">
          <Doughnut
            data={{
              labels: labelsOfCategories,
              datasets: [
                {
                  label: "Expenses",
                  data: categoriesSpent,
                  backgroundColor: chartBgColors,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              ...pieOptions,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
  );
};

export default CategoryPieChart;