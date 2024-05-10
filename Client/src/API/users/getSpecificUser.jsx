import api from "../post.jsx";
import React from "react";

const getSpecificUser = async (id) => {
  let userData = [];
  function encodePasswords(credentials) {
    return credentials.map((cred) => {
      const encodedPassword = atob(cred.UserPassword).split("password")[0];
      return { ...cred, UserPassword: encodedPassword };
    });
  }
  const token = localStorage.getItem("token");

  try {
    const result = await api.get(`/user/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    userData = encodePasswords(result?.map((item) => item.JSONData1[0]));
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSpecificUser;
