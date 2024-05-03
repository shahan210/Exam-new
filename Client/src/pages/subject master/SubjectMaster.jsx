import React from "react";
import Navbar from "../dashboard/components/Navbar";
import Sidebar from "../dashboard/components/Sidebar";
import SubjectMaterHome from "./components/SubjectMaterHome";

const SubjectMaster = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <SubjectMaterHome />
      </div>
    </div>
  );
};

export default SubjectMaster;
