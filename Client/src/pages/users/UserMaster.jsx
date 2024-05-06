import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getUsers from "../../API/users/getUsers.jsx";
import Layout from "../../global/components/Layout.jsx";
import Spinner from "../../global/components/Spinner.jsx";
import UserMasterTable from "./components/UserMasterTable.jsx";
const UserMaster = () => {
  const [UserList, setUserList] = useState();
  const [loading, setLoading] = useState(true);

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
  }, [loading]);
  return (
    <Layout>
      <div className="p-2 w-full">
        <div>
          <h1 className="text-xl">User Master</h1>
        </div>
        <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
          <div className="mt-3">
            {loading ? (
              <Spinner />
            ) : UserList?.length !== 0 ? (
              <UserMasterTable UserList={UserList} />
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
