const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Budget Analytics</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Track your spending against budget goals
        </p>
      </div>
    </div>
  );
};

export default AnalyticsHeader;