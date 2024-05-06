import React from "react";
import api from "../post.jsx";

const getClassEdit = async (data, id) => {
  let userData = [];
  try {
    const result = await api.put(`/class/${id}`, {
      CLNAME: data.CLNAME,
      SECNAME: data.SECNAME,
      ModifiedBy: "shahan",
      IsActive: data.IsActive,
    });
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassEdit;
