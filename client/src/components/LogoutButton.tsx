import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";

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
      className="btn btn-outline flex items-center gap-2"
    >
      {isPending && <span className="loading loading-spinner loading-sm"></span>}
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;