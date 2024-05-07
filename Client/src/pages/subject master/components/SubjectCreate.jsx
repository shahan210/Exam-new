import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSubjectCreate from "../../../API/subjectMaster/getSubjectCreate";
import getSubjectEdit from "../../../API/subjectMaster/getSubjectEdit";
import getSubjectSpecific from "../../../API/subjectMaster/getSubjectSpecific";
import { useGlobalContext } from "../../../global/GlobalContext";
import ModalComponent from "../../../global/components/Modal";

const SubjectCreate = ({ title, subjectID }) => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [editSubject, setEditSubject] = useState();
  const { modalComponent, setModalComponent } = useGlobalContext();
  // create user and add addedd by
  const createSubject = async (data, e) => {
    e.preventDefault();

    try {
      const result = await getSubjectCreate(data);
      if (result[0][0]?.insertId === undefined) {
        return;
      }
      setModalComponent(false);
      toast.success("Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const updateSubject = async (data, e) => {
    e.preventDefault();
    try {
      const result = await getSubjectEdit(data, subjectID);
      // console.log(result);
      if (result[0]?.insertId === undefined) {
        return;
      }
      toast.success("Updated Successfully");
      setModalComponent(false);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const getSubject = async () => {
    if (subjectID !== 0 && loading) {
      try {
        const result = await getSubjectSpecific(subjectID);
        console.log(result[0]);
        setEditSubject(result[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getSubject();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (!modalComponent) {
      reset();
    }
  }, [modalComponent, reset]);

  useEffect(() => {
    if (editSubject) {
      Object.entries(editSubject).forEach(([key, value]) => {
        console.log(key, value);
        setValue(key, value);
      });
    }
  }, [editSubject, setValue]);

  if (loading) {
  } else {
    return (
      <ModalComponent title={title}>
        <div>
          <div className=" bg-[#EEEEEE] text-black shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded p-2 ">
            <div>
              <div className="mb-4 mt-2 md:grid grid-cols-3 justify-center items-center ">
                <label
                  htmlFor="SubjectName"
                  className="flex justify-center mb-1"
                >
                  Subject Name{" "}
                </label>
                <input
                  {...register("SubjectName")}
                  onChange={(e) => setValue("SubjectName", e.target.value)}
                  defaultValue={subjectID == 0 ? "" : editSubject?.SubjectName}
                  id="SubjectName"
                  type="text"
                  className="w-full col-span-2 md:w-1/2 bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
              <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
                <label
                  htmlFor="QDescription"
                  className="flex justify-center mb-1"
                >
                  Description{" "}
                </label>
                <input
                  {...register("QDescription")}
                  onChange={(e) => setValue("QDescription", e.target.value)}
                  defaultValue={subjectID == 0 ? "" : editSubject?.QDescription}
                  id="QDescription"
                  type="text"
                  className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
              <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="switch" className="flex justify-center mb-1">
                  IsActive
                </label>
                <div className="switch">
                  <input
                    {...register("IsActive")}
                    onChange={(e) => setValue("IsActive", e.target.checked)}
                    type="checkbox"
                    id="switch"
                    defaultChecked={
                      subjectID == 0
                        ? true
                        : editSubject?.IsActive == 1
                        ? true
                        : false
                    }
                  />
                  <label htmlFor="switch">
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end p-1 ">
              <button
                onClick={
                  subjectID == 0
                    ? handleSubmit(createSubject)
                    : handleSubmit(updateSubject)
                }
                className="p-2 text-center bg-green-400 text-white rounded w-24  hover:bg-green-500 transition-all ease-in-out duration-100"
              >
                {subjectID == 0 ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </ModalComponent>
    );
  }
};

export default SubjectCreate;
