import React from "react";
import api from "../post.jsx";

const getClassSpecific = async (id) => {
  let userData = [];
  try {
    const result = await api.get(`/class/${id}`);
    console.log(result);
    userData = result?.map((item) => item.JSONData1[0]);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassSpecific;
