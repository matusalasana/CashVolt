const AnalyticsLoader = () => {
  return (
    <div className="flex p-6 w-full flex-col gap-8">
      <div className="skeleton card h-50 w-full"></div>
      <div className="flex flex-wrap gap-5 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-30 w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsLoader;