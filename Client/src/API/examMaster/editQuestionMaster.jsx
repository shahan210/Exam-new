import api from "../post.jsx";

const getQuizMasterEditInfo = async (id) => {
    try {
        const result = await api.get(`/quesMasteredit/${id}`);
        return result;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default getQuizMasterEditInfo;
