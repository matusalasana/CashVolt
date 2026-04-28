import { Doughnut } from "react-chartjs-2";
import { pieOptions, chartBgColors } from "../../utils/chart";
import RectangularLoadingSkeleton from "../RectangularLoadingSkeleton";

interface Props {
  budgets: any[];
  isLoading: boolean;
  
}

const CategoryPieChart = ({budgets, isLoading}: Props) => {
  
  const labelsOfCategories = budgets?.slice(0,5)
    .filter(b => b.spent > 0)
    .map(c => c.category_name);
  const categoriesSpent = budgets?.slice(0,5)
    .filter(b => b.spent > 0)
    .map(c => c.spent);

  const hasData = categoriesSpent?.length > 0
  
  if (isLoading) {
    return <RectangularLoadingSkeleton amount={1} height={40} />;
  }
  
  if(!hasData){
    return null;
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