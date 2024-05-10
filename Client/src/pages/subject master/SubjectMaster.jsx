import React, { useEffect, useState } from "react";
import { getSubjectTable } from "../../API/subjectMaster/getSubjectTable";
import { useGlobalContext } from "../../global/GlobalContext";
import Layout from "../../global/components/Layout.jsx";
import Spinner from "../../global/components/Spinner.jsx";
import SubjectCreate from "./components/SubjectCreate";
import SubjectMaterHome from "./components/SubjectMasterTable.jsx";
import { useNavigate } from "react-router-dom";
const SubjectMaster = () => {
  const [subjectList, setSubjectList] = useState();
  const [loading, setLoading] = useState(true);
  const [subjectID, setSubjectID] = useState(0);
  const { modalComponent, setModalComponent } = useGlobalContext();
  const navigate = useNavigate();
  const handleTrue = (id) => {
    setModalComponent(true);
    setSubjectID(id);
  };

  const fetchSubjects = async () => {
    try {
      const result = await getSubjectTable();
      // console.log(result[0]);
      setSubjectList(result[0]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
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
          <SubjectCreate
            title={subjectID == 0 ? "Create New Subject" : "Edit Subject"}
            subjectID={subjectID}
          />
        )}
        {loading && <Spinner />}
        <div>
          <h1 className="text-xl">Subject Master</h1>
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
            ) : subjectList?.length !== 0 ? (
              <SubjectMaterHome
                handleTrue={handleTrue}
                subjectList={subjectList}
              />
            ) : (
              <div className="text-xl md:text-3xl shadow-lg shadow-slate-200 p-2 rounded text-center">
                No Records Found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubjectMaster;
