import React from "react";
import ModalComponent from "../../../global/components/Modal";

const SubjectCreate = ({ title }) => {
  return (
    <ModalComponent title={title}>
      <div>
        <div className=" bg-[#176B87] text-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded p-2 ">
          <div>
            <div className="mb-4 mt-2 md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Subject Name{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2 bg-slate-300 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Description{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-300 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Added By{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-300 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Added Date{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-300 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Modified Date{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-300 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Modified By{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-300 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div>
            {/* <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="SubjectName" className="flex justify-center mb-1">
                Subject Name{" "}
              </label>
              <input
                id="SubjectName"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border rounded "
                placeholder=""
              />
            </div> */}
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default SubjectCreate;
