import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getClassTable from "../../API/classMaster/getClassTable";
import { getSubjectTable } from "../../API/subjectMaster/getSubjectTable";
import getSpecificUser from "../../API/users/getSpecificUser";
import getUserCreate from "../../API/users/getUserCreate";
import getUserEdit from "../../API/users/getUserEdit";
import Layout from "../../global/components/Layout";
import Spinner from "../../global/components/Spinner";
import UserEditContent from "./components/UserEditContent";
import getUserSubjectsUpdate from "../../API/users/getUserSubjectsUpdate";
import getUserSubjectsClass from "../../API/users/getUserSubjects";
import getUserMasterCreate from "../../API/users/getUserMasterCreate";

const UserMasterEdit = () => {
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState();
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [subjectList, setSubjectList] = useState();
  const [classList, setClassList] = useState();
  const [classSearch, setClassSearch] = useState();
  const [userSubjectClass, setUserSubjectClass] = useState();
  const [subjectSearch, setSubjectSearch] = useState();
  const [selected, setSelected] = useState();
  const [password, setPassword] = useState();
  const [userClass, setUserClass] = useState();
  const [userSubject, setUserSubject] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const createUser = async (data, e) => {
    e.preventDefault();
    if (data.UserPassword !== password) {
      toast.error("Password mismatch");
      return;
    } else if (selected == undefined) {
      toast.error("Select Rights");
      return;
    }
    try {
      const result = await getUserCreate(data, selected);

      if (result[0][0]?.insertId === undefined) {
        return;
      } else {
        const subjects = await getUserMasterCreate(
          result[0][0]?.insertId,
          userClass,
          userSubject
        );
      }
      navigate("/user_master");

      toast.success("Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const updateUser = async (data, e) => {
    if (data.UserPassword !== password) {
      toast.error("Password mismatch");
      return;
    } else if (selected == undefined) {
      toast.error("Select Rights");
      return;
    }
    // console.log(data);
    e.preventDefault();
    try {
      const result = await getUserEdit(data, selected, id);
      const subjects = await getUserSubjectsUpdate(id, userClass, userSubject);
      if (result[0]?.insertId === undefined) {
        return;
      }

      navigate("/user_master");
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const getUser = async () => {
    if (id !== 0 && loading) {
      const rightsString = localStorage.getItem("rights");
      const superAdmin = JSON.parse(localStorage.getItem("user"));
      const rights = rightsString.split(",").map((str) => str.trim());
      const userID = 1023;
      if (superAdmin.UserType !== 6) {
        if (!rights.includes(userID.toString())) {
          toast.warning("Access Denied");
          navigate("/user_master");
          return;
        }
      }
      try {
        const result = await getSpecificUser(id);
        console.log(result[0]);
        setSelected(result[0].RightsDetails.split(","));
        setPassword(result[0]?.UserPassword);
        setEditUser(result[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    } else {
      if (id !== 0 && loading) {
        const rightsString = localStorage.getItem("rights");
        const rights = rightsString.split(",").map((str) => str.trim());
        const superAdmin = JSON.parse(localStorage.getItem("user"));
        const id = 1022;
        if (superAdmin.UserType !== 6) {
          if (!rights.includes(id.toString())) {
            toast.warning("Access Denied");
            navigate("/user_master");
            return;
          }
        }
      }
    }
  };
  const fetchSubjects = async () => {
    if (loading) {
      try {
        const result = await getSubjectTable();
        // console.log(result[0]);
        setSubjectList(result[0]);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchClassess = async () => {
    try {
      const result = await getClassTable();
      // console.log(result);
      setClassList(result[0]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const fetchUser = async () => {
    try {
      const result = await getUserSubjectsClass(id);
      // console.log(result[0]);
      setUserSubjectClass(result[0]);
      const transformedClassData = result[0].map((item, index) => ({
        QstClass: "",
        ClassId: item.ClassId,
        SubjectName: "",
        SubjectID: "",
        id: index,
      }));
      setUserClass(transformedClassData);
      const transformedSubData = result[0].map((item, index) => ({
        QstClass: "",
        ClassId: "",
        SubjectName: "",
        SubjectID: item.SubjectID,
        id: index,
      }));
      setUserSubject(transformedSubData);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };
  const getRightSelected = (id) => {
    if (selected !== undefined) {
      const checkDup = selected.filter((item) => item == id);
      if (checkDup.length !== 0) {
        const deleteID = selected.filter((item) => item != id);
        setSelected(deleteID);
      } else {
        setSelected([...selected, id]);
      }
    } else {
      setSelected([id]);
    }
  };
  const getUserSubjects = (i, value) => {
    const findValue = subjectList.filter((item) => item.SubjectName == value);
    const subjectIndex = userSubject.findIndex((subject) => subject.id === i);
    if (subjectIndex !== -1) {
      const subjectToUpdate = userSubject[subjectIndex];

      // Check if either SubjectID or SubjectName is empty
      if (subjectToUpdate.ClassId == "") {
        setUserSubject((prevUserSubjects) => {
          const updatedSubjects = [...prevUserSubjects];
          updatedSubjects.splice(subjectIndex, 1); // Delete the object
          return updatedSubjects;
        });
      } else {
        // Update properties of the subject
        setUserSubject((prevUserSubjects) => {
          const updatedSubjects = [...prevUserSubjects];
          updatedSubjects[subjectIndex] = {
            ...subjectToUpdate,
            SubjectID: "",
            SubjectName: "",
          };
          return updatedSubjects;
        });
      }
    }
    if (userSubject !== undefined) {
      if (findValue.length > 0) {
        const newSubject = {
          QstClass: "",
          ClassId: "",
          SubjectName: findValue[0].SubjectName,
          SubjectID: findValue[0].SubjectID,
          id: i,
        };
        setUserSubject([...userSubject, newSubject]);
      }
    } else {
      if (findValue.length > 0) {
        const Subject = {
          QstClass: "",
          classId: "",
          SubjectName: findValue[0].SubjectName,
          SubjectID: findValue[0].SubjectID,
          id: i,
        };
        setUserSubject([Subject]);
      }
    }
  };

  const getUserClass = (i, value) => {
    const findValue = classList.filter((item) => item.QstClass == value);
    const subjectIndex = userClass.findIndex((subject) => subject.id === i);
    if (subjectIndex !== -1) {
      const subjectToUpdate = userClass[subjectIndex];

      // Check if either SubjectID or SubjectName is empty
      if (subjectToUpdate.SubjectID == "") {
        setUserClass((prevUserSubjects) => {
          const updatedSubjects = [...prevUserSubjects];
          updatedSubjects.splice(subjectIndex, 1); // Delete the object
          return updatedSubjects;
        });
      } else {
        // Update properties of the subject
        setUserClass((prevUserSubjects) => {
          const updatedSubjects = [...prevUserSubjects];
          updatedSubjects[subjectIndex] = {
            ...subjectToUpdate,
            ClassId: "",
            QstClass: "",
          };
          return updatedSubjects;
        });
      }
    }
    if (userClass !== undefined) {
      if (findValue.length > 0) {
        const newSubject = {
          QstClass: findValue[0].QstClass,
          ClassId: findValue[0].ClassId,
          SubjectName: "",
          SubjectID: "",
          id: i,
        };
        setUserClass([...userClass, newSubject]);
      }
    } else {
      if (findValue.length > 0) {
        const Subject = {
          QstClass: findValue[0].QstClass,
          classid: findValue[0].ClassId,
          SubjectName: "",
          SubjectID: "",
          id: i,
        };
        setUserClass([Subject]);
      }
    }
  };
  useEffect(() => {
    getUser();
    fetchSubjects();
    fetchClassess();
    fetchUser();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [loading]);
  useEffect(() => {
    if (editUser) {
      Object.entries(editUser).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [editUser, setValue]);

  const searchSubject = (x) => {
    if (x !== undefined && x !== "") {
      const value = x.toLowerCase();
      let startsWithB = (string) => string.toLowerCase().startsWith(value);
      let searchusers = subjectList.filter((user) =>
        startsWithB(user?.SubjectName)
      );
      setSubjectSearch(searchusers);
    } else {
      setSubjectSearch("");
    }
  };
  const searchClass = (x) => {
    if (x !== undefined && x !== "") {
      const value = x.toLowerCase();
      let startsWithB = (string) => string.toLowerCase().startsWith(value);
      let searchusers = classList.filter((user) => startsWithB(user?.QstClass));
      setClassSearch(searchusers);
    } else {
      setClassSearch("");
    }
  };

  const rows = Array.from({ length: 20 }, (_, index) => {
    const subjectID =
      userSubjectClass !== undefined && userSubjectClass[index]
        ? userSubjectClass[index]?.SubjectID
        : null;
    const subject =
      userSubjectClass !== undefined &&
      subjectList?.find((subject) => subject.SubjectID === subjectID);
    const classID =
      userSubjectClass !== undefined && userSubjectClass[index]
        ? userSubjectClass[index]?.ClassId
        : null;
    const classDef =
      userSubjectClass !== undefined &&
      classList?.find((cls) => cls.ClassId === classID);
    return (
      <tr className="tableBody-1" key={index}>
        <td className="p-1  text-center">{index + 1}</td>
        <td className="p-1 border">
          <input
            type="search"
            className="w-full bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]"
            list={`suggestions1-${index}`}
            onChange={(e) => {
              searchSubject(e.target.value);
              getUserSubjects(index, e.target.value);
            }}
            defaultValue={subject?.SubjectName}
          />
          <datalist
            id={`suggestions1-${index}`}
            className="w-full bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]"
            onClick={(e) => {
              getUserSubjects(index, e.target.value);
            }}
          >
            {subjectSearch && subjectSearch.length > 0 && (
              <option value={subjectSearch[0]?.SubjectName}></option>
            )}
          </datalist>
        </td>
        <td className="p-2 border border-">
          <input
            type="search"
            className="w-full bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]"
            list={`suggestions2-${index}`}
            onChange={(e) => {
              searchClass(e.target.value);
              getUserClass(index, e.target.value);
            }}
            onClick={(e) => {
              getUserClass(index, e.target.value);
            }}
            defaultValue={classDef?.QstClass}
          />
          <datalist
            id={`suggestions2-${index}`}
            onClick={(e) => {
              getUserClass(index, e.target.value);
            }}
          >
            {classSearch &&
              classSearch.length > 0 &&
              classSearch.slice(0, 6).map((item, j) => {
                return <option key={j} value={item.QstClass}></option>;
              })}
          </datalist>
        </td>
      </tr>
    );
  });
  return (
    <Layout>
      <div className="p-2 w-full">
        <div>
          {loading && <Spinner />}
          <h1 className="text-xl">Class Master</h1>
        </div>
        <div className="shadow-sm shadow-slate-400 w-full rounded p-2 ">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/user_master")}
              className="p-2 text-center bg-black text-white rounded w-24 hover:scale-105 transition-all ease-in-out duration-100"
            >
              Back
            </button>
            <button
              onClick={
                id !== 0 ? handleSubmit(updateUser) : handleSubmit(createUser)
              }
              className="p-2 text-center bg-green-500 text-white rounded w-24  hover:scale-105 transition-all ease-in-out duration-100"
            >
              {id !== 0 ? "Update" : "Save"}
            </button>
          </div>
          <div className="mt-5 xl:grid xl:grid-cols-2">
            <div className="w-full">
              <div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="UserName" className="w-1/2">
                    User Name
                  </label>
                  <input
                    {...register("UserName")}
                    onChange={(e) => setValue("UserName", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.UserName}
                    id="UserName"
                    type="text"
                    className="w-full bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="UserPassword" className="w-1/2 ">
                    Password
                  </label>
                  <input
                    {...register("UserPassword")}
                    onChange={(e) => setValue("UserPassword", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.UserPassword}
                    id="UserPassword"
                    type="password"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="UserPassword" className="w-1/2 ">
                    Confirm Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.UserPassword}
                    id="UserPassword"
                    type="password"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="UserType" className="w-1/2 ">
                    User Type
                  </label>
                  <select
                    {...register("UserType")}
                    onChange={(e) => setValue("UserType", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.UserType}
                    id="UserType"
                    type="text"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  >
                    <option value="" selected disabled>
                      --Select--
                    </option>
                    <option value="6">SuperAdmin</option>
                    <option value="3">Admin</option>
                    <option value="1">User</option>
                  </select>
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="EmailID" className="w-1/2 ">
                    Email ID
                  </label>
                  <input
                    {...register("EmailID")}
                    onChange={(e) => setValue("EmailID", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.EmailID}
                    id="EmailID"
                    type="text"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="PhNo" className="w-1/2 ">
                    Phone No
                  </label>
                  <input
                    {...register("PhNo")}
                    onChange={(e) => setValue("PhNo", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.PhNo}
                    id="PhNo"
                    type="text"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
                <div className="mb-2 mt-2 w-1/2 flex   items-center ">
                  <label htmlFor="UserLocation" className="w-1/2 ">
                    Location
                  </label>
                  <input
                    {...register("UserLocation")}
                    onChange={(e) => setValue("UserLocation", e.target.value)}
                    defaultValue={id == 0 ? "" : editUser?.UserLocation}
                    id="UserLocation"
                    type="text"
                    className="w-full   bg-slate-100 focus:bg-white  p-1 text-black focus:outline-none border-gray-300 focus:shadow-[rgba(0,0,0,0.24)_0px_2px_8px]-2 border-2 rounded-lg "
                    placeholder=""
                  />
                </div>
              </div>
              <div className="tableDiv lg:w-full xl:w-[520px] mb-4 xl:mb-0 mt-4">
                <table className="table ">
                  <thead className="tableHead">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        SI.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subject{" "}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Class{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-black">{rows}</tbody>
                </table>
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : editUser?.length !== 0 ? (
              <UserEditContent
                getRightSelected={getRightSelected}
                selected={selected}
                id={id}
              />
            ) : (
              <div className="text-xl md:text-3xl shadow-lg shadow-slate-200 p-2 rounded text-center">
                No Records Found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserMasterEdit;
