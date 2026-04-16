import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex relative flex-col gap-5">
      <div className="fixed bg-base-200 shadow-lg z-10 top-0 w-full left-0">
        <Sidebar />
      </div>
      <main className="pt-25">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;