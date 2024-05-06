import pool from "../../Config/config.js";

export const getExamMaster = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM examdefinitiontmst");
        if (result[0].length > 0) {
            res.json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: result[0],
                        JSONData2: [],
                        JSONData3: [],
                        JSONData4: [],
                        JSONData5: [],
                        JSONData1Remarks: "",
                        JSONData2Remarks: "",
                        JSONData3Remarks: "",
                        JSONData4Remarks: "",
                        JSONData5Remarks: "",
                    },
                ],
                message: "successfull",
                status: 200,
            });
            // console.log(result);
        } else {
            res.status(200).json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: result[0],
                        JSONData2: [],
                        JSONData3: [],
                        JSONData4: [],
                        JSONData5: [],
                        JSONData1Remarks: "",
                        JSONData2Remarks: "",
                        JSONData3Remarks: "",
                        JSONData4Remarks: "",
                        JSONData5Remarks: "",
                    },
                ],
                message: "no data found",
            });
        }
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export const getYearClassSubjectWiseList = async (req, res) => {
    const Data = req.body
    console.log(Data,'data');
    try {
        const result =
            await pool.query(`SELECT * FROM examdefinitiontmst WHERE AcaYear = ? AND SubjectID = ? AND ClassId = ?;
        `);
        if (result[0].length > 0) {
            res.json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: result[0],
                        JSONData2: [],
                        JSONData3: [],
                        JSONData4: [],
                        JSONData5: [],
                        JSONData1Remarks: "",
                        JSONData2Remarks: "",
                        JSONData3Remarks: "",
                        JSONData4Remarks: "",
                        JSONData5Remarks: "",
                    },
                ],
                message: "successfull",
                status: 200,
            });
            // console.log(result);
        } else {
            res.status(200).json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: result[0],
                        JSONData2: [],
                        JSONData3: [],
                        JSONData4: [],
                        JSONData5: [],
                        JSONData1Remarks: "",
                        JSONData2Remarks: "",
                        JSONData3Remarks: "",
                        JSONData4Remarks: "",
                        JSONData5Remarks: "",
                    },
                ],
                message: "no data found",
            });
        }
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
};
