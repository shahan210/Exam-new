import React from "react";

const getSubjectDelete = async () => {
  let userData = [];
  try {
    const result = await api.delete("/subjects", {
      id: id,
    });
    console.log(result);
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectDelete;
