import React from "react";
import Navbar from "../dashboard/components/Navbar";
import Sidebar from "../dashboard/components/Sidebar";

const ClassMaster = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  );
};

export default ClassMaster;
