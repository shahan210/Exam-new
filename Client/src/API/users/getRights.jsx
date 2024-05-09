import React from "react";
import api from "../post.jsx";

const getRights = async () => {
  let userData = [];
  try {
    const result = await api.get("/rights");
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getRights;
