import SavingsCard from "./SavingsCard";
import SavingsEmptyState from "./SavingsEmptyState";
import SavingsLoader from "./SavingsLoader";

const SavingsGrid = ({ savings, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <SavingsLoader />;
  }

  if (!savings?.length) {
    return <SavingsEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savings?.map((item) => (
        <SavingsCard
          key={item.id}
          id={item.id}
          title={item.title}
          target_amount={item.target_amount}
          saved_amount={item.current_amount || 0} 
          due_date={item.due_date}
          days_left={item.days_left}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
};

export default SavingsGrid;