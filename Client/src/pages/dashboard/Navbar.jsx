import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-100 text-black w-full sticky top-0 z-50 p-2">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-2xl">School Name</h1>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 focus:outline-none text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            type="button"
            id="radix-:rj0:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            Logout
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
