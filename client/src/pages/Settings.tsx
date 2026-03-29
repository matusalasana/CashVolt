import React from 'react'
import { useNavigate } from "react-router-dom";


const Settings = () => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  return (
    <div>
      <p className="text-2xl">Settings page</p>
    
    <button onClick={handleLogout} className="border-1 text-red-700 border-red-200">
      Logout
    </button>
    </div>
  )
}

export default Settings