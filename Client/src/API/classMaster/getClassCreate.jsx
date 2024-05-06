import React from "react";
import api from "../post.jsx";

const getClassCreate = async (data) => {
  console.log(data);
  let userData = [];
  try {
    const result = await api.post("/class", {
      CLNAME: data.CLNAME,
      SECNAME: data.SECNAME,
      AddedBy: "shahan",
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
