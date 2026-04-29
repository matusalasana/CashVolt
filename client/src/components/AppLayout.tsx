import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
    
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 min-w-0 overflow-x-auto py-4 px-3 sm:px-4 md:px-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AppLayout;