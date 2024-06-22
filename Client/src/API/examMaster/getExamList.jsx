import api from "../post.jsx";

const getExamList = async (data) => {
  let userData = [];
  try {
    const result = await api.post("/exam", {
      year: data?.year,
      class: data?.className,
      subject: data?.subject,
    });
    userData = result?.map((item) => item.JSONData1);
    return userData;
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getExamList;
