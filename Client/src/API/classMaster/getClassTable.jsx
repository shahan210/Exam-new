import api from "../post.jsx";

const getClassTable = async () => {
  let userData = [];
  const token = localStorage.getItem("token");

  try {
    const result = await api.get("/class", {
      headers: { Authorization: "Bearer " + token },
    });
    // console.log(result);
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getClassTable;
