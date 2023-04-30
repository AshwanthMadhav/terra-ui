import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-7rem)] bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
