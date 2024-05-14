import React from "react";
import api from "../post.jsx";

const getSubjectCreate = async (data) => {
  const getuser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  let userData = [];
  try {
    const result = await api.post("/subjects", {
      SubjectName: data.SubjectName,
      QDescription: data.QDescription,
      AddedBy: getuser.UserName,
      IsActive: data.IsActive,
      headers: { Authorization: "Bearer " + token },
    });
    if (result[0].ErrorMessage == "Subject already exists") {
      return (userData = "Subject exists");
    }
    if (result.message == "Token expired") {
      userData = result;
    } else {
      userData = result?.map((item) => item.JSONData1);
    }
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectCreate;
