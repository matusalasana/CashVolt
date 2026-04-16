import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-sm">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full w-96">
        <Search size={18} />
        <input
          className=" outline-none w-full"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell />
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;