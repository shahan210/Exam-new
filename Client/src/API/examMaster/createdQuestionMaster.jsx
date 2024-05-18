import api from "../post.jsx";

const createdQuestionMaster = async (data) => {
    console.log(data);
    let userData = [];
    try {
        const result = await api.post("/createdQuestionMaster", {
            data: JSON.stringify(data),
            AddedBy: "snrdev",
        });
        console.log(result);
        userData = result?.map((item) => item.JSONData1[0]);
        return userData;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default createdQuestionMaster;
