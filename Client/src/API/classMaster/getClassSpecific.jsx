import React from "react";
import api from "../post.jsx";

const getClassSpecific = async (id) => {
  let userData = [];
  const token = localStorage.getItem("token");

  try {
    const result = await api.get(`/class/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(result);
    userData = result?.map((item) => item.JSONData1[0]);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassSpecific;
