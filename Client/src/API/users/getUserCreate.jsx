import api from "../post.jsx";
import React from "react";

const getUserCreate = async (data) => {
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));

  const UserDetails = {
    UserName: data.UserName,
    UserPassword: btoa(data.UserPassword + "password"),
    UserType: data.UserType,
    EmailID: data.EmailID,
    PhNo: data.PhNo,
    RightsDetails: data.RightsDetails,
    AddedBy: getuser.UserName,
    UserLocation: data.UserLocation,
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
