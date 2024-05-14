/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trash from "../../../assets/svg/Trash.svg";
import EditIcon from "../../../assets/svg/edit.svg";
const SubjectMaterHome = ({ subjectList, handleTrue }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const deleteSubject = async (id) => {
    try {
      toast.success("Deleted Successfully");

      // const result = await getSubjectDelete(id);
    } catch (error) {
      toast.error("Error");

      console.log(error);
    }
  };
  const itemsPerPage = 20;

  const visiblePageButtons = 5;

  const totalPages = Math.ceil(subjectList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subjectList.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let startPage = Math.max(1, currentPage - Math.floor(visiblePageButtons / 2));
  let endPage = Math.min(startPage + visiblePageButtons - 1, totalPages);

  if (endPage - startPage + 1 < visiblePageButtons) {
    startPage = Math.max(1, endPage - visiblePageButtons + 1);
  }
  const paginationButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`${
          currentPage === i
            ? "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-whit"
            : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }
  return (
    <div>
      <div className="tableDiv">
        <table className="table">
          <thead className="tableHead">
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
                    className={i % 2 === 0 ? "tableBody-1" : "tableBody-2"}
                  >
                    <td className="px-6 py-4 flex">
                      <img
                        onClick={() => handleTrue(subject?.SubjectID)}
                        src={EditIcon}
                        alt="edit"
                        className="Action-Button"
                      />
                      <img
                        onClick={() => deleteSubject()}
                        src={Trash}
                        alt="edit"
                        className="Action-Button"
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
      <div className="block md:hidden max-w-xl mx-auto bg-white shadow-md p-8 rounded-lg">
        <div className="overflow-hidden max-h-[1024]px">
          {subjectList.slice(startIndex, endIndex).map((book, index) => (
            <div
              className="border-2  rounded-lg mb-4 shadow-lg overflow-hidden"
              key={index + 1}
            >
              <div className="flex bg-gray-100 justify-between  py-2 px-4 rounded-t-lg shadow-md">
                <img
                  onClick={() => handleTrue(book?.SubjectID)}
                  src={EditIcon}
                  className="h-6 w-6"
                />
                <img
                  onClick={() => deleteClass(book?.SubjectID)}
                  src={Trash}
                  className="h-6 w-6"
                />
              </div>

              <table className="w-full table-auto mt-2">
                <tbody>
                  <tr>
                    <td className="tableCard">
                      <strong> SI.No</strong>
                    </td>
                    <td className="border border-solid border-gray-400 text-start p-2 w-1/2">
                      {book?.SubjectID}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableCard">
                      <strong> Subject</strong>
                    </td>
                    <td className="border border-solid border-gray-400 text-start p-2 w-1/2">
                      {book?.SubjectName}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableCard">
                      <strong> Description</strong>
                    </td>
                    <td className="border border-solid border-gray-400 text-start capitalize p-2 w-1/2">
                      {book?.QDescription}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-gray-800 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-700 hover:text-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </button>
        {/* Page number buttons */}
        {startPage > 1 && (
          <button
            key={1}
            className="page-button"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        )}
        {startPage > 2 && (
          <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ...
          </span>
        )}
        {paginationButtons}
        {endPage < totalPages - 1 && (
          <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ...
          </span>
        )}
        {endPage < totalPages && (
          <button
            key={totalPages}
            className="page-button"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-800 border border-gray-300 rounded-e-lg hover:bg-gray-700 hover:text-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SubjectMaterHome;
