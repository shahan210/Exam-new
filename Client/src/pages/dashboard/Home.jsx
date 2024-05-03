import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
