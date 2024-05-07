/* eslint-disable react/prop-types */
import Navbar from "../../pages/dashboard/components/Navbar";
import Sidebar from "../../pages/dashboard/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />
      <div className="md:pl-72">
        <Navbar />
        <div className="relative">
          <div className="h-screen overflow-scroll backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black  mx-auto pt-24 p-4 absolute top-0 right-0 left-0 botton-0 z-[11]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
