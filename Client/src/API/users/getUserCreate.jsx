import api from "../post.jsx";
import React from "react";

const getUserCreate = async (data, selected) => {
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const UserDetails = {
    UserName: data.UserName,
    UserPassword: btoa(data.UserPassword + "password"),
    UserType: data.UserType,
    EmailID: data.EmailID,
    PhNo: data.PhNo,
    RightsDetails: selected.join(","),
    AddedBy: getuser.UserName,
    UserLocation: data.UserLocation,
    headers: { Authorization: "Bearer " + token },
  };

  try {
    const result = await api.post("/user", UserDetails);
    userData = result?.map((item) => item.JSONData1[0]);
    // console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUserCreate;
