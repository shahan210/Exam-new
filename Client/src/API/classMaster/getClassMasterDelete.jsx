import api from "../post.jsx";

const getClassMasterDelete = async (id) => {
  let userData = [];
  const token = localStorage.getItem("token");

  try {
    const result = await api.delete("/class", {
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

export default getClassMasterDelete;
