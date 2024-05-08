import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSpecificUser from "../../../API/users/getSpecificUser";
import getUserCreate from "../../../API/users/getUserCreate";
import getUserEdit from "../../../API/users/getUserEdit";
import { useGlobalContext } from "../../../global/GlobalContext";
import ModalComponent from "../../../global/components/Modal";
import Layout from "../../../global/components/Layout";
import Spinner from "../../../global/components/Spinner";
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
      <Layout>
        <div className="p-2 w-full">
          <div>
            <h1 className="text-xl">Class Master</h1>
          </div>
          <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
            <div className="mt-3">
              {/* {loading ? (
                <Spinner />
              ) : classList?.length !== 0 ? (
                <ClassMasterTable
                  handleTrue={handleTrue}
                  classList={classList}
                />
              ) : (
                <div className="text-xl md:text-3xl shadow-lg shadow-slate-200 p-2 rounded text-center">
                  No Records Found
                </div>
              )} */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default UserMasterEdit;
