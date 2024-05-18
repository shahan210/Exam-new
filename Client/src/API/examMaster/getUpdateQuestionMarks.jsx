import api from "../post.jsx";

const getUpdateQuestionMarks = async (data) => {
  let userData = [];
  try {
    const result = await api.post("/UploadMark", data);
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getUpdateQuestionMarks;
