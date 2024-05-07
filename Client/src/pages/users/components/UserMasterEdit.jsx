import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSpecificUser from "../../../API/users/getSpecificUser";
import getUserCreate from "../../../API/users/getUserCreate";
import getUserEdit from "../../../API/users/getUserEdit";
import { useGlobalContext } from "../../../global/GlobalContext";
import ModalComponent from "../../../global/components/Modal";
const UserMasterEdit = ({ userID, title }) => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [editUser, setEditUser] = useState();
  const { modalComponent, setModalComponent } = useGlobalContext();
  const createSubject = async (data, e) => {
    e.preventDefault();
    try {
      const result = await getUserCreate(data);
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
  const updateUser = async (data, e) => {
    e.preventDefault();
    try {
      const result = await getUserEdit(data, userID);
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
  const getUser = async () => {
    if (userID !== 0 && loading) {
      try {
        const result = await getSpecificUser(userID);
        // console.log(result[0]);
        setEditUser(result[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getUser();
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
    if (editUser) {
      Object.entries(editUser).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [editUser, setValue]);
  if (loading) {
  } else {
    return (
      <ModalComponent title={title}>
        <div>
          <div className=" bg-[#EEEEEE] text-black shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded p-2 ">
            <div>
              <div className="mb-4 mt-2 md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="UserName" className="text-center ml-5 mb-1">
                  UserName{" "}
                </label>
                <input
                  {...register("UserName")}
                  onChange={(e) => setValue("UserName", e.target.value)}
                  defaultValue={userID == 0 ? "" : editUser?.UserName}
                  id="UserName"
                  type="text"
                  className="w-full col-span-2 md:w-1/2 bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
              <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="UserPassword" className="text-center ml-5 mb-1">
                  PassWord
                </label>
                <input
                  {...register("UserPassword")}
                  onChange={(e) => setValue("UserPassword", e.target.value)}
                  defaultValue={userID == 0 ? "" : editUser?.UserPassword}
                  id="UserPassword"
                  type="password"
                  className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
              <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
                <label htmlFor="UserType" className="text-center ml-5 mb-1">
                  Type
                </label>
                <input
                  {...register("UserType")}
                  onChange={(e) => setValue("UserType", e.target.value)}
                  defaultValue={userID == 0 ? "" : editUser?.UserType}
                  id="UserType"
                  type="text"
                  className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                  placeholder=""
                />
              </div>
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="EmailID" className="text-center ml-5 mb-1">
                Email ID
              </label>
              <input
                {...register("EmailID")}
                onChange={(e) => setValue("EmailID", e.target.value)}
                defaultValue={userID == 0 ? "" : editUser?.EmailID}
                id="EmailID"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="PhNo" className="text-center ml-5 mb-1">
                Phone Number{" "}
              </label>
              <input
                {...register("PhNo")}
                onChange={(e) => setValue("PhNo", e.target.value)}
                defaultValue={userID == 0 ? "" : editUser?.PhNo}
                id="PhNo"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center ">
              <label htmlFor="UserLocation" className="text-center ml-5 mb-1">
                Location
              </label>
              <input
                {...register("UserLocation")}
                onChange={(e) => setValue("UserLocation", e.target.value)}
                defaultValue={userID == 0 ? "" : editUser?.UserLocation}
                id="UserLocation"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                placeholder=""
              />
            </div>
            <div className="mb-4 mt-2 w-full md:grid grid-cols-3 justify-center items-center">
              <label htmlFor="RightsDetails" className="text-center ml-5 mb-1">
                Rights{" "}
              </label>
              <textarea
                {...register("RightsDetails")}
                onChange={(e) => setValue("RightsDetails", e.target.value)}
                defaultValue={userID == 0 ? "" : editUser?.RightsDetails}
                id="RightsDetails"
                type="text"
                className="w-full col-span-2 md:w-1/2  p-1 bg-slate-100 focus:bg-white text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px] border-2 rounded-lg "
                placeholder=""
              />
            </div>
            <div className="flex w-full justify-end p-1">
              <button
                onClick={
                  userID == 0
                    ? handleSubmit(createSubject)
                    : handleSubmit(updateUser)
                }
                className="p-2 text-center bg-green-400 text-white rounded w-24  hover:bg-green-500 transition-all ease-in-out duration-100"
              >
                {userID == 0 ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </ModalComponent>
    );
  }
};

export default UserMasterEdit;
