import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;