
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  
  const { data: userInfo, isLoading: userLoading } = useAuth();
  

  if (userLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>

      {/* Header */}
      <div>
        <p className="text-2xl font-bold">
          Welcome Back{" "}
          <span className="text-blue-600">
            {userInfo.first_name}
          </span>
        </p>
      </div>


    </div>
  );
};

export default Dashboard;