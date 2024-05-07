import React from "react";
import api from "../post.jsx";

const getClassCreate = async (data) => {
  console.log(data);
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));
  try {
    const result = await api.post("/class", {
      CLNAME: data.CLNAME,
      SECNAME: data.SECNAME,
      AddedBy: getuser.UserName,
      IsActive: data.IsActive,
    });
    console.log(result);
    userData = result?.map((item) => item.JSONData1[0]);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassCreate;
