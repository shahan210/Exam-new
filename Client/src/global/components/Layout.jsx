/* eslint-disable react/prop-types */
import Navbar from "../../pages/dashboard/components/Navbar";
import Sidebar from "../../pages/dashboard/components/Sidebar";
import { useGlobalContext } from "../GlobalContext";
import Spinner from "./Spinner";

const Layout = ({ children }) => {
    const { loading } = useGlobalContext();
    return (
        <>
            {loading && <Spinner />}
            <div className="h-screen overflow-hidden">
                <Sidebar />
                <div className="md:ml-60 lg:ml-72">
                    <Navbar />
                    <div className="relative">
                        <div className="h-screen overflow-scroll backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black  mx-auto pt-24 p-4 absolute top-0 right-0 left-0 botton-0 z-[11]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
