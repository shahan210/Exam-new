import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getUsers from "../../API/users/getUsers.jsx";
import Layout from "../../global/components/Layout.jsx";
import Spinner from "../../global/components/Spinner.jsx";
import UserMasterTable from "./components/UserMasterTable.jsx";
import { useGlobalContext } from "../../global/GlobalContext.jsx";
import UserMasterEdit from "./components/UserMasterEdit.jsx";
const UserMaster = () => {
  const [UserList, setUserList] = useState();
  const [loading, setLoading] = useState(true);
  const { modalComponent, setModalComponent } = useGlobalContext();
  const [userID, setUserID] = useState();

  const handleTrue = (id) => {
    setModalComponent(true);
    setUserID(id);
  };
  const fetchSubjects = async () => {
    try {
      const result = await getUsers();
      // console.log(result);
      setUserList(result[0]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [loading, modalComponent]);
  return (
    <Layout>
      <div className="p-2 w-full">
        {modalComponent && (
          <UserMasterEdit
            title={userID === 0 ? "Create New User" : "Edit User"}
            userID={userID}
          />
        )}
        <div>
          <h1 className="text-xl">User Master</h1>
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
            ) : UserList?.length !== 0 ? (
              <UserMasterTable handleTrue={handleTrue} UserList={UserList} />
            ) : (
              <div className="text-xl md:text-3xl shadow-lg shadow-slate-200 p-2 rounded text-center">
                No Records Found
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default UserMaster;
