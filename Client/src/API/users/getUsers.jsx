import React from "react";
import api from "../post.jsx";

const getUsers = async () => {
  let userData = [];
  try {
    const result = await api.get("/user");
    userData = result?.map((item) => item.JSONData1);
    // console.log(userdata);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUsers;
