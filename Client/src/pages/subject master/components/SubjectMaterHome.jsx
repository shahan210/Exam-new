import React, { useEffect, useState } from "react";
import Spinner from "../../../global/components/Spinner.jsx";
import api from "../../../API/post.jsx";
import EditIcon from "../../../assets/svg/edit.svg";
import { useGlobalContext } from "../../../global/GlobalContext.jsx";
import SubjectCreate from "./SubjectCreate.jsx";
const SubjectMaterHome = () => {
  const [subjectList, setSubjectList] = useState();
  const [loading, setLoading] = useState(true);
  const { modalComponent, setModalComponent } = useGlobalContext();
  const [state, setState] = useState();

  const fetchSubjects = async () => {
    if (loading) {
      await api
        .get("/subjects")
        .then((response) => {
          console.log(response);
          setSubjectList(response);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        })
        .catch((err) => {
          console.log("errorr");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [loading]);

  return (
    <div className="p-2 w-full">
      {modalComponent && state === "new" && (
        <SubjectCreate title={"Create New Subject"} />
      )}
      {modalComponent && state === "edit" && (
        <SubjectCreate title={"Edit Subject"} />
      )}
      {loading && <Spinner />}
      <div>
        <h1 className="text-xl">Subject Master</h1>
      </div>
      <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setModalComponent(true), setState("new");
            }}
            className="p-2 text-center bg-green-500 text-white rounded w-24  hover:scale-105 transition-all ease-in-out duration-100"
          >
            New
          </button>
          <button className="p-2 text-center bg-red-500 text-white rounded w-24 hover:scale-105 transition-all ease-in-out duration-100">
            Delete
          </button>
        </div>
        <div className="mt-3">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-[530px] overflow-y-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-300">
              <thead class="text-xs text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Action{" "}
                  </th>
                  <th scope="col" class="px-6 py-3">
                    SI/No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subject Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Added By
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Added Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Modified Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectList !== undefined &&
                  subjectList.length > 0 &&
                  subjectList?.map((item, i) => {
                    return (
                      <tr
                        class={
                          i % 2 === 0
                            ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            : "bg-white border-b dark:bg-gray-700 dark:border-gray-700"
                        }
                      >
                        <td class="px-6 py-4 flex">
                          <img
                            onClick={() => {
                              setModalComponent(true), setState("edit");
                            }}
                            src={EditIcon}
                            alt="edit"
                            className="hover:scale-105 cursor-pointer mr-2"
                          />
                          {/* <input type="checkbox" /> */}
                        </td>
                        <td class="px-6 py-4">{i + 1}</td>
                        <td class="px-6 py-4">{item.SubjectName}</td>
                        <td class="px-6 py-4">{item.QDescription}</td>
                        <td class="px-6 py-4">{item.AddedBy}</td>
                        <td class="px-6 py-4">{item.AddedDate}</td>
                        <td class="px-6 py-4">{item.ModifiedDate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectMaterHome;
