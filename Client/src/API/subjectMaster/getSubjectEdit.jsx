import React from "react";
import api from "../post.jsx";

const getSubjectEdit = async (data, id) => {
  let userData = [];
  try {
    const result = await api.put(`/subjects/${id}`, {
      SubjectName: data.SubjectName,
      QDescription: data.QDescription,
      ModifiedBy: "shahan",
      IsActive: data.IsActive,
    });
    userData = result?.map((item) => item.JSONData1);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectEdit;
