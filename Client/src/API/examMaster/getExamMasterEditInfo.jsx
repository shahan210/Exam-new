import api from "../post.jsx";

const getExamMasterEditInfo = async (id) => {
    try {
        const result = await api.get(`/examMasteredit/${id}`);
        return result;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default getExamMasterEditInfo;
