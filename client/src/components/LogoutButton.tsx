import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="btn btn-error btn-outline w-full flex items-center justify-center gap-2 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60"
    >
      {isPending ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Logging out...
        </>
      ) : (
        <>
          <LogOut size={18} />
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutButton;