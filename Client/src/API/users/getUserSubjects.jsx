import React from "react";
import api from "../post.jsx";

const getUserSubjectsClass = async (login) => {
  let userData = [];
  console.log(login);
  try {
    const result = await api.get(`/usersubject/${login}`);
    console.log(result);
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUserSubjectsClass;
