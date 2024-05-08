import api from "../post.jsx";

const createExamMaster = async (data) => {
    console.log(data);
    let userData = [];
    try {
        const result = await api.post("/examCreate", {
            data: JSON.stringify(data),
            AddedBy: "snrdev",
        });
        userData = result?.map((item) => item.JSONData1[0]);
        return userData;
    } catch (error) {
        console.log("errorr");
        console.log(error);
    }
};

export default createExamMaster;
