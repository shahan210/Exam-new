import React from "react";
import api from "../post.jsx";

const getSubjectEdit = async (data, id) => {
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  try {
    const result = await api.put(`/subjects/${id}`, {
      SubjectName: data.SubjectName,
      QDescription: data.QDescription,
      ModifiedBy: getuser.UserName,
      IsActive: data.IsActive,
      SubjectID: id,
      headers: { Authorization: "Bearer " + token },
    });
    console.log(result);
    if (result[0].ErrorMessage == "Subject already exists") {
      return (userData = "Subject exists");
    }
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectEdit;
