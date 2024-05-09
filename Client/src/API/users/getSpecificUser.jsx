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
  try {
    const result = await api.get(`/user/${id}`);
    userData = encodePasswords(result?.map((item) => item.JSONData1[0]));
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSpecificUser;
