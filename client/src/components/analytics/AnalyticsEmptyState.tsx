import { LayoutGrid } from "lucide-react";

const AnalyticsEmptyState = () => {
  return (
    <div className="text-center py-20 opacity-50">
      <LayoutGrid className="mx-auto mb-4" size={48} />
      <p className="text-xl">No analytics found.</p>
    </div>
  );
};

export default AnalyticsEmptyState;