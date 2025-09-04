import React from "react";
import Header from "../pages/frontend/Header";
import Footer from "../pages/frontend/Footer";
import { Outlet } from "react-router-dom";

function FrontendLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontendLayout;
