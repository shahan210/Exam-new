/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trash from "../../../assets/svg/Trash.svg";
import EditIcon from "../../../assets/svg/edit.svg";
const SubjectMaterHome = ({ subjectList, handleTrue }) => {
    const deleteSubject = async (id) => {
        try {
            toast.success("Deleted Successfully");

            // const result = await getSubjectDelete(id);
        } catch (error) {
            toast.error("Error");

            console.log(error);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[530px] overflow-y-auto">
            <table className="w-full text-md text-left rtl:text-right text-gray-200 dark:text-gray-200">
                <thead className="text-sm text-gray-200 uppercase bg-gray-600 dark:bg-gray-800 dark:text-gray-200 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Action{" "}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SI/No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Subject Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody className="text-black">
                    {subjectList !== undefined &&
                        subjectList.length > 0 &&
                        subjectList?.map((subject, i) => {
                            return (
                                <tr
                                    key={i}
                                    className={
                                        i % 2 === 0
                                            ? "bg-white border-b dark:bg-white dark:border-gray-700"
                                            : "bg-gray-100 border-b dark:bg-gray-100 dark:border-gray-700"
                                    }
                                >
                                    <td className="px-6 py-4 flex">
                                        <img
                                            onClick={() => handleTrue(subject?.SubjectID)}
                                            src={EditIcon}
                                            alt="edit"
                                            className="hover:scale-105 cursor-pointer mr-2"
                                        />
                                        <img
                                            onClick={() => deleteSubject()}
                                            src={Trash}
                                            alt="edit"
                                            className="hover:scale-105 cursor-pointer mr-2"
                                        />
                                        {/* <input type="checkbox" /> */}
                                    </td>
                                    <td className="px-6 py-4">{i + 1}</td>
                                    <td className="px-6 py-4">{subject?.SubjectName}</td>
                                    <td className="px-6 py-4">{subject?.QDescription}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectMaterHome;
