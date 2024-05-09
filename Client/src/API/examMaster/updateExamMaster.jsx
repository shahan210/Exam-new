import api from "../post.jsx";

const updateExamMaster = async (data) => {
    console.log(data);
    let userData = [];
    try {
        const result = await api.put("/examMasteredit", {
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

export default updateExamMaster;
