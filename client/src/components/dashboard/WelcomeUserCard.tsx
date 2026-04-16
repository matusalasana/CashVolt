import { Calendar } from "lucide-react";

type Props = {
  name: string;
  monthName: string;
  year: number;
};

const WelcomeUserCard = ({ name, monthName, year }: Props) => {

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 p-6">

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, <span className="text-primary">{name}</span> 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay consistent and keep tracking your finances
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>
            {monthName} {year}
          </span>
        </div>
      </div>

      {/* EXTRA MESSAGE */}
      <div className="mt-6 text-sm text-gray-500">
        💡 Tip: Small savings today can grow into big results tomorrow.
      </div>
    </div>
  );
};

export default WelcomeUserCard;