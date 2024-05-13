import React from "react";
import api from "../post.jsx";
export const getSubjectTable = async (subid) => {
  let userData = [];
  const token = localStorage.getItem("token");
  try {
    const result = await api.get("/subjects", {
      headers: { Authorization: "Bearer " + token, subjects: subid },
    });
    userData = result?.map((item) => item.JSONData1);
    // console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};
