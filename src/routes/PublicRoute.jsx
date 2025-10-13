import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("token");
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
