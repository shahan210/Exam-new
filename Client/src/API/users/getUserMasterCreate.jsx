import React from "react";
import api from "../post.jsx";

const getUserMasterCreate = async (id, userClass, userSubject) => {
  let userData = [];
  const getClassID = userClass.map((item) => item.ClassId);
  const getSubjectsID = userSubject.map((item) => item.SubjectID);
  const UserDetails = {
    id: id,
    subjects: userSubject !== undefined ? getSubjectsID : [],
    class: userClass !== undefined ? getClassID : [],
  };
  console.log(UserDetails);
  try {
    const result = await api.post(`/usersubject`, UserDetails);
    // userData = result?.map((item) => item.JSONData1);
    // console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUserMasterCreate;
