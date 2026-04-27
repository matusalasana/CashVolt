import { useEffect, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";

type Props = {
  name: string;
  monthName: string;
  year: number;
};

const WelcomeUserCard = ({ name, monthName, year }: Props) => {
  const currentHour = new Date().getHours();
  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  const fullText = `${getGreeting()}, ${name} 👋`;

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-base-100/40 border border-base-300 shadow-xl">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative p-6 md:p-8">

        {/* Greeting */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-base-content">
            {text}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-sm md:text-base text-base-content/60">
            Stay consistent and keep tracking your finances
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-base-300" />

        {/* Date */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-base-content/70">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm font-medium">
              {dayName}, {monthName} {year}
            </span>
          </div>

          <div className="flex items-center gap-2 text-amber-500 text-sm italic">
            <Sparkles size={14} />
            Small savings build big futures
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeUserCard;