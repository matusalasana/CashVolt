const TransactionsLoader = () => {
  return (
    <div className="flex p-6 w-full flex-col gap-8">
      <div className="flex flex-wrap gap-5 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-35 w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsLoader;