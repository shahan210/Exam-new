import api from "../post.jsx";

const getQuestionMaster = async (id) => {
    let userData = [];
    try {
        const result = await api.get(`/createnewquestion/${id}`);
        userData = result?.map((item) => item.JSONData1[0]);
        return userData;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default getQuestionMaster;
