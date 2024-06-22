import axios from "axios";
const baseUrl = import.meta.env.VITE_URL;
const getDownloadBlank = async () => {
  try {
    const result = await axios.get(`${baseUrl}/download-excel`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "blankQuestionModel.xlsx"); // The downloaded file's name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return { msg: "success" };
  } catch (error) {
    console.log("errorr");
    console.log(error);
  }
};

export default getDownloadBlank;
