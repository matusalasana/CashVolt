
import { Outlet, useLocation } from "react-router-dom" 
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
  const { pathname } = useLocation();
  
  // Handle scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Toaster position="top-right" />
      
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
