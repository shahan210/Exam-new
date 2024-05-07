import api from "../post.jsx";
import React from "react";

const getUserEdit = async (data, id) => {
  let userData = [];
  const getuser = JSON.parse(localStorage.getItem("user"));
  const UserDetails = {
    UserName: data.UserName,
    UserPassword: btoa(data.UserPassword + "password"),
    UserType: data.UserType,
    EmailID: data.EmailID,
    PhNo: data.PhNo,
    RightsDetails: data.RightsDetails,
    UserLocation: data.UserLocation,
    ModifiedBy: getuser.UserName,
  };
  try {
    const result = await api.put(`/user/${id}`, UserDetails);
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUserEdit;
