import api from "../post.jsx";
import React from "react";

const getUserEdit = async (data, selected, id) => {
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
    UserLocation: data.UserLocation,
    ModifiedBy: getuser.UserName,
    headers: { Authorization: "Bearer " + token },
  };
  try {
    const result = await api.put(`/user/${id}`, UserDetails);
    userData = result?.map((item) => item.JSONData1);
    // console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUserEdit;
