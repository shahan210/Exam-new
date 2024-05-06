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
    <div class="tableDiv">
      <table class="table">
        <thead class="tableHead">
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
                <tr class={i % 2 === 0 ? "tableBody-1" : "tableBody-2"}>
                  <td class="px-6 py-4 flex">
                    <img
                      onClick={() => handleTrue(subject?.ClassId)}
                      src={EditIcon}
                      alt="edit"
                      className="Action-Button"
                    />
                    <img
                      onClick={() => deleteClass(subject?.ClassId)}
                      src={Trash}
                      alt="edit"
                      className="Action-Button"
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
