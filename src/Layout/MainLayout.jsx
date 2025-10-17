import Navbar from "../components/common/Navbar";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default MainLayout;
