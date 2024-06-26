import React from "react";
import api from "../post.jsx";

const getClassEdit = async (data, id) => {
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  try {
    const result = await api.put(`/class/${id}`, {
      CLNAME: data.CLNAME,
      SECNAME: data.SECNAME,
      ModifiedBy: getuser.UserName,
      IsActive: data.IsActive,
      headers: { Authorization: "Bearer " + token },
    });
    if (result[0].ErrorMessage == "Class already exists") {
      return (userData = "Class exists");
    }
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassEdit;
