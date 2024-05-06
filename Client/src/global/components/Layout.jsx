import React from "react";
import Navbar from "../../pages/dashboard/components/Navbar";
import Sidebar from "../../pages/dashboard/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className=" min-h-full flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
