import api from "../post.jsx";

const uploadQuestionImages = async (data) => {
    console.log(data,'formDAta');
    // let userData = [];
    try {
        const result = await api.post("/uploadQuestionImages", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // userData = result?.map((item) => item.JSONData1[0]);
        return result;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default uploadQuestionImages;
