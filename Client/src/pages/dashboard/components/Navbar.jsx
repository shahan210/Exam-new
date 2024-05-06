import React from "react";
import School from "../../../assets/jpg/school.jpg";
import Master from "../../../assets/jpg/master.jpg";

const Navbar = () => {
  return (
    <div className="bg-slate-100 text-black w-full sticky top-0 z-50 p-2">
      <div className="flex justify-between gap-4">
        <img src={School} alt="" className="w-[200px] h-12" />
        <img src={Master} alt="" className="w-[200px] h-12" />
      </div>
    </div>
  );
};

export default Navbar;
