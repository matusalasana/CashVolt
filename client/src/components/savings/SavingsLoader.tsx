const SavingsLoader = () => {
  return (
    <div className="flex p-6 w-full flex-col gap-8">
      <div className="flex flex-wrap gap-5 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-32 w-full md:w-[48%] lg:w-[32%] rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};

export default SavingsLoader;