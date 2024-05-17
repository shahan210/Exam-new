import api from "../post.jsx";

const uploadQuestionFiles = async (data) => {
    console.log(data,'formDAta');
    // let userData = [];
    try {
        const result = await api.post("/uploadQuestionfile", data, {
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

export default uploadQuestionFiles;
