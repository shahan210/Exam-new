import React from "react";
import EditIcon from "../../../assets/svg/edit.svg";
import Trash from "../../../assets/svg/Trash.svg";
import { useNavigate } from "react-router-dom";

const UserMasterTable = ({ UserList, handleTrue }) => {
  const navigate = useNavigate();
  return (
    <div className="tableDiv">
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th scope="col" className="px-6 py-3">
              Action{" "}
            </th>{" "}
            <th scope="col" className="px-6 py-3">
              SI/No
            </th>
            <th scope="col" className="px-6 py-3">
              UserName{" "}
            </th>
            <th scope="col" className="px-6 py-3">
              Email ID
            </th>
            <th scope="col" className="px-6 py-3">
              Phone No{" "}
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {UserList !== undefined &&
            UserList.length > 0 &&
            UserList?.map((subject, i) => {
              // console.log(subject);
              return (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "tableBody-1" : "tableBody-2"}
                >
                  <td className="px-6 py-4 flex">
                    <img
                      onClick={() => {
                        navigate("/user_master/edit-user", {
                          state: {
                            id: subject?.LoginID,
                          },
                        });
                      }}
                      src={EditIcon}
                      alt="edit"
                      className="Action-Button"
                    />
                    <img
                      // onClick={() => deleteSubject()}
                      src={Trash}
                      alt="edit"
                      className="Action-Button"
                    />
                    {/* <input type="checkbox" /> */}
                  </td>
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{subject?.UserName}</td>
                  <td className="px-6 py-4">{subject?.EmailID}</td>
                  <td className="px-6 py-4">{subject?.PhNo}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserMasterTable;
