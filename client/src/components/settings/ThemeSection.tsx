import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeSection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto w-full p-4">
      <div className="mb-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
          Visual Theme
        </h2>
      </div>

      <div className="flex rounded-2xl bg-base-200 p-1">

        {/* Light */}
        <button
          onClick={() => setTheme("light")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition-all ${
            theme === "light"
              ? "bg-base-100 text-base-content shadow-sm"
              : "text-base-content/60 hover:text-base-content"
          }`}
        >
          <Sun size={18} strokeWidth={2} />
          Light
        </button>

        {/* Dark */}
        <button
          onClick={() => setTheme("dark")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition-all ${
            theme === "dark"
              ? "bg-base-100 text-base-content shadow-sm"
              : "text-base-content/60 hover:text-base-content"
          }`}
        >
          <Moon size={18} strokeWidth={2} />
          Dark
        </button>

      </div>
    </div>
  );
};

export default ThemeSection;