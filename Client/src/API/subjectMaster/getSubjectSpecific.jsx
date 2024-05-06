import api from "../post.jsx";

const getSubjectSpecific = async (id) => {
  let userData = [];
  try {
    const result = await api.get(`/subjects/${id}`);
    console.log(result);
    userData = result?.map((item) => item.JSONData1[0]);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getSubjectSpecific;
