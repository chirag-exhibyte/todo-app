import { Navigate, Outlet } from "react-router";


const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
