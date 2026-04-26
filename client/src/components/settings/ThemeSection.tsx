import { useTheme } from "../../context/ThemeContext";

const ThemeSection = () => {
  const { theme, setTheme } = useTheme(); // now GLOBAL

  return (
    <div className="mx-auto w-full p-4">
      <div className="mb-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
          Visual Theme
        </h2>
      </div>

      <div className="flex rounded-2xl bg-base-200 p-1">

        <button
          onClick={() => setTheme("light")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold ${
            theme === "light"
              ? "bg-base-100 shadow-sm"
              : "opacity-60"
          }`}
        >
          Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold ${
            theme === "dark"
              ? "bg-base-100 shadow-sm"
              : "opacity-60"
          }`}
        >
          Dark
        </button>

      </div>
    </div>
  );
};

export default ThemeSection;