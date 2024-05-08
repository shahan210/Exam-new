import api from "../post.jsx";

const getClassTable = async () => {
    let userData = [];
    try {
        const result = await api.get("/class");
        userData = result?.map((item) => item.JSONData1);
        return userData;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default getClassTable;
