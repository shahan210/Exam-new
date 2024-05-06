import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getClassCreate from "../../../API/classMaster/getClassCreate";
import getClassEdit from "../../../API/classMaster/getClassEdit";
import getClassSpecific from "../../../API/classMaster/getClassSpecific";
import { useGlobalContext } from "../../../global/GlobalContext";
import ModalComponent from "../../../global/components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClassMasterEdit = ({ title, classID }) => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [editClass, setEditClass] = useState();
  const { modalComponent, setModalComponent } = useGlobalContext();
  // create user and add addedd by
  const createSubject = async (data, e) => {
    e.preventDefault();
    try {
      const result = await getClassCreate(data);
      console.log(result);
      if (result[0][0].insertId === undefined) {
        return;
      }
      toast.success("Created Successfully");
      setModalComponent(false);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const updateSubject = async (data, e) => {
    e.preventDefault();
    try {
      const result = await getClassEdit(data, classID);
      if (result[0]?.insertId === undefined) {
        return;
      }
      setModalComponent(false);
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const getClass = async () => {
    if (classID !== 0 && loading) {
      try {
        const result = await getClassSpecific(classID);
        console.log(result[0], 1);
        setEditClass(result[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getClass();
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
    if (editClass) {
      Object.entries(editClass).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [editClass, setValue]);

  if (loading) {
  } else {
    return (
      <ModalComponent title={title}>
        <ToastContainer />
        <div>
          <div className=" bg-[#EEEEEE] text-black shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded p-2 ">
            <div>
              <div className="mb-4 mt-2 md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="CLNAME" className="flex justify-center mb-1">
                  Class{" "}
                </label>
                <input
                  {...register("CLNAME")}
                  onChange={(e) => setValue("CLNAME", e.target.value)}
                  defaultValue={classID == 0 ? "" : editClass?.CLNAME}
                  id="CLNAME"
                  type="text"
                  className="w-full col-span-2 md:w-1/2 bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
              <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="SECNAME" className="flex justify-center mb-1">
                  Section{" "}
                </label>
                <input
                  {...register("SECNAME")}
                  onChange={(e) => setValue("SECNAME", e.target.value)}
                  defaultValue={classID == 0 ? "" : editClass?.SECNAME}
                  id="SECNAME"
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
                      classID == 0
                        ? true
                        : editClass?.IsActive == 1
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
                  classID == 0
                    ? handleSubmit(createSubject)
                    : handleSubmit(updateSubject)
                }
                className="p-2 text-center bg-green-400 text-white rounded w-24  hover:bg-green-500 transition-all ease-in-out duration-100"
              >
                {classID == 0 ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </ModalComponent>
    );
  }
};

export default ClassMasterEdit;
