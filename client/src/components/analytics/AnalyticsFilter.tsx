const AnalyticsFilter = ({ month, year, setMonth, setYear, months, years }) => {
  return (
    <div className="flex gap-4 flex-wrap items-end">
      
      <div className="flex flex-col">
        <label className="text-sm mb-1">Month</label>
        <select
          className="select select-bordered"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={i + 1} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Year</label>
        <select
          className="select select-bordered"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnalyticsFilter;