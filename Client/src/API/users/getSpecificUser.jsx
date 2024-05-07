import api from "../post.jsx";
import React from "react";

const getSpecificUser = async (id) => {
  let userData = [];
  try {
    const result = await api.get(`/user/${id}`);
    userData = result?.map((item) => item.JSONData1[0]);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSpecificUser;
