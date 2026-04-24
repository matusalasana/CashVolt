const DashboardLoader = () => {
  return (
    <div className="flex p-6 w-full flex-col gap-8">
      <div className="skeleton card h-50 w-full animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-30 w-full animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoader;