import React from "react";
import EditIcon from "../../../assets/svg/edit.svg";
import Trash from "../../../assets/svg/Trash.svg";
import getClassMasterDelete from "../../../API/classMaster/getClassMasterDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClassMasterTable = ({ classList, handleTrue }) => {
  const deleteClass = async (id) => {
    try {
      // const result = await getClassMasterDelete(id);
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Error");

      console.log(error);
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-[530px] overflow-y-auto">
      <ToastContainer />
      <table class="w-full text-md text-left rtl:text-right text-gray-200 dark:text-gray-200 ">
        <thead class="text-sm text-gray-200 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-200 sticky top-0">
          <tr>
            <th scope="col" class="px-6 py-3">
              Action{" "}
            </th>
            <th scope="col" class="px-6 py-3">
              SI/No
            </th>
            <th scope="col" class="px-6 py-3">
              Full Class
            </th>
            <th scope="col" class="px-6 py-3">
              Class
            </th>
            <th scope="col" class="px-6 py-3">
              Section
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {classList !== undefined &&
            classList.length > 0 &&
            classList?.map((subject, i) => {
              return (
                <tr
                  class={
                    i % 2 === 0
                      ? "bg-white border-b dark:bg-white dark:border-gray-700"
                      : "bg-gray-100 border-b dark:bg-gray-100 dark:border-gray-700"
                  }
                >
                  <td class="px-6 py-4 flex">
                    <img
                      onClick={() => handleTrue(subject?.ClassId)}
                      src={EditIcon}
                      alt="edit"
                      className="hover:scale-105 cursor-pointer mr-2"
                    />
                    <img
                      onClick={() => deleteClass(subject?.ClassId)}
                      src={Trash}
                      alt="edit"
                      className="hover:scale-105 cursor-pointer mr-2"
                    />
                    {/* <input type="checkbox" /> */}
                  </td>
                  <td class="px-6 py-4">{i + 1}</td>
                  <td class="px-6 py-4">{subject?.QstClass}</td>
                  <td class="px-6 py-4">{subject?.CLNAME}</td>
                  <td class="px-6 py-4">{subject?.SECNAME}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassMasterTable;
