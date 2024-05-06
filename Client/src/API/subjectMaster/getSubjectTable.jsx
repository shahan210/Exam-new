import React from "react";
import api from "../post.jsx";
export const getSubjectTable = async () => {
  let userData = [];
  try {
    const result = await api.get("/subjects");
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};
