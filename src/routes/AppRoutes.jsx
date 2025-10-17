import { Route, Routes } from "react-router";
import PublicRoute from "./PublicRoute";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../Layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import Registration from "@/pages/auth/Registration";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Route>

      <Route path="*" element={<>404 Page</>} />
    </Routes>
  );
};

export default AppRoutes;
