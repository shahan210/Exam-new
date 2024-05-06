import React, { useEffect, useState } from "react";
import getClassTable from "../../API/classMaster/getClassTable";
import { useGlobalContext } from "../../global/GlobalContext";
import Spinner from "../../global/components/Spinner";
import Navbar from "../dashboard/components/Navbar";
import Sidebar from "../dashboard/components/Sidebar";
import ClassMasterEdit from "./components/ClassMasterEdit";
import ClassMasterTable from "./components/ClassMasterTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClassMaster = () => {
  const [classList, setClassList] = useState();
  const [loading, setLoading] = useState(true);
  const [classID, setClassID] = useState(0);
  const { modalComponent, setModalComponent } = useGlobalContext();

  const handleTrue = (id) => {
    setModalComponent(true);
    setClassID(id);
  };

  const fetchClassess = async () => {
    try {
      const result = await getClassTable();
      // console.log(result[0][0]);
      setClassList(result[0]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchClassess();
  }, [loading, modalComponent]);

  return (
    <div className="scrollbar-thin scrollbar-webkit">
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="p-2 w-full">
          {modalComponent && (
            <ClassMasterEdit
              title={classID == 0 ? "Create New Class" : "Edit Class"}
              classID={classID}
            />
          )}
          {loading && <Spinner />}
          <div>
            <h1 className="text-xl">Class Master</h1>
          </div>
          <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTrue(0)}
                className="p-2 text-center bg-green-500 text-white rounded w-24  hover:scale-105 transition-all ease-in-out duration-100"
              >
                New
              </button>
              <button className="p-2 text-center bg-red-500 text-white rounded w-24 hover:scale-105 transition-all ease-in-out duration-100">
                Delete
              </button>
            </div>
            <div className="mt-3">
              {loading ? (
                <Spinner />
              ) : classList?.length !== 0 ? (
                <ClassMasterTable
                  handleTrue={handleTrue}
                  classList={classList}
                />
              ) : (
                <div className="text-xl md:text-3xl shadow-lg shadow-slate-200 p-2 rounded text-center">
                  No Records Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMaster;
