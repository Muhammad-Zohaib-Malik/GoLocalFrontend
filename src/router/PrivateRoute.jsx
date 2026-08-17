import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = document.cookie.includes("accessToken=");
  // If no token is found, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // If authenticated, allow access to the route
  return element;
};
export default PrivateRoute;
