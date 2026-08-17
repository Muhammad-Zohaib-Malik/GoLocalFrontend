import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const PrivateRoute = ({ element }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  // If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return element;
};

export default PrivateRoute;
