import React from "react";
import api from "../post.jsx";

const getSubjectCreate = async (data) => {
  const getuser = JSON.parse(localStorage.getItem("user"));
  let userData = [];
  try {
    const result = await api.post("/subjects", {
      SubjectName: data.SubjectName,
      QDescription: data.QDescription,
      AddedBy: getuser.UserName,
      IsActive: data.IsActive,
    });
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectCreate;
