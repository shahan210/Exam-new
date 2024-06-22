import api from "../post.jsx";

const getStudentImport = async () => {
  let userData = [];
  const token = localStorage.getItem("token");
  try {
    const result = await api.post("/student", {
      headers: { Authorization: "Bearer " + token },
    });
    userData = result?.map((item) => item.JSONData1[0]);
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export default getStudentImport;
