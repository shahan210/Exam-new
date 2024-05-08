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
    const Data = req.body;
    console.log(Data, "data");
    try {
        const result = await pool.query(
            `SELECT * FROM examdefinitiontmst WHERE AcaYear = ? AND SubjectID = ? AND ClassId = ?;`,
            [Data.year, Data.subject.id, Data.class.id]
        );
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

export const createExamMaster = async (req, res) => {
    const data = req.body;
    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const pa = JSON.parse(data.data);
    const dateStr = new Date(pa.ExamDateStr);
    const dated = new Date(dateStr);
    const formattedDate = dated.toISOString().slice(0, 19).replace("T", " ");

    try {
        const result = await pool.query(
            "INSERT INTO examdefinitiontmst (AcaYear, ExamDate , ExamName, ClassId,  SubjectID, AddedBy, AddedDate, ALTMTHour, ALTMTMin, ALTMTSec, ExamHeading, ExamSubHeading) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
            [
                pa.year,
                formattedDate,
                pa.ExamName,
                pa.className.id,
                pa.subject.id,
                data.AddedBy,
                Adddate,
                pa.ALTMTHour,
                pa.ALTMTMin,
                pa.ALTMTSec,
                pa.ExamHeading,
                pa.ExamSubHeading,
            ]
        );
        if (result.length > 0) {
            res.json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: [result],
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
        } else {
            res.status(200).json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: [result],
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
            console.log(result, "result");
        }
    } catch (error) {
        console.log(error);
    }
};

export const getExamMasterInfo = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const result = await pool.query("SELECT * FROM examdefinitiontmst WHERE QuestionTestID = ?;", [id]);
        console.log(result, "result");
        if (result.length > 0) {
            res.json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: [result],
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
        } else {
            res.status(200).json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: [result],
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
    } catch (error) {
        console.log(error);
    }
};

export const newQuestionMaster = async (req, res) => {
    const id = req.params.id;

    const result = {
        QuestionBankID: "",
        QuestionTestID: id,
        QuestionGroupID: "",
        QuestionGroupSLNO: "",
        QuestionGroupType: "",
        ClassId: "",
        SubjectID: "",
        ClassSubjectMasterId: "",
        ChapterID: "",
        QuestionTypeID: "",
        QuestionDesc01: "",
        QuestionDesc02: "",
        Practical: "",
        Remarks: "",
        Qalerts: "",
        Question1: "",
        Answer: "",
        Answer1: "",
        Answer2: "",
        Answer3: "",
        Answer4: "",
        Answer5: "",
        Answer6: "",
        Answer7: "",
        Answer8: "",
        Answer9: "",
        Answer10: "",
        RightAnswer: "",
        IsActive: "",
        AddedDate: "",
        AddedBy: "",
        ModifiedDate: "",
        ModifiedBy: "",
        FileDocument: "",
        Audio: "",
        Video: "",
        Image: "",
    };
    res.status(200).json({
        data: [
            {
                ActionType: "",
                ErrorMessage: "",
                ErrorCode: "",
                JSONData1: [result],
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
        message: "create new question",
    });
};

export const createdQuestionMaster = async (req, res) => {
    const data = req.body;

    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const pa = JSON.parse(data.data);
    const dateStr = new Date(pa.ExamDateStr);
    const dated = new Date(dateStr);
    const formattedDate = dated.toISOString().slice(0, 19).replace("T", " ");

    try {
        const response = await pool.query(
            `INSERT INTO questionbankmst (
            QuestionBankID,
            QuestionTestID,
            QuestionGroupID,
            QuestionGroupSLNO,
            QuestionGroupType,
            ClassId,
            SubjectID,
            ClassSubjectMasterId,
            ChapterID,
            QuestionTypeID,
            QuestionDesc01,
            QuestionDesc02,
            Practical,
            Remarks,
            Qalerts,
            Question1,
            Answer,
            Answer1,
            Answer2,
            Answer3,
            Answer4,
            Answer5,
            Answer6,
            Answer7,
            Answer8,
            Answer9,
            Answer10,
            RightAnswer,
            IsActive,
            AddedDate,
            AddedBy,
            ModifiedDate,
            ModifiedBy,
            FileDocument,
            Audio,
            Video,
            Image
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
            [
                data.QuestionBankID,
                data.QuestionTestID,
                data.QuestionGroupID,
                data.QuestionGroupSLNO,
                data.QuestionGroupType,
                data.ClassId,
                data.SubjectID,
                data.ClassSubjectMasterId,
                data.ChapterID,
                data.QuestionTypeID,
                data.QuestionDesc01,
                data.QuestionDesc02,
                data.Practical,
                data.Remarks,
                data.Qalerts,
                data.Question1,
                data.Answer,
                data.Answer1,
                data.Answer2,
                data.Answer3,
                data.Answer4,
                data.Answer5,
                data.Answer6,
                data.Answer7,
                data.Answer8,
                data.Answer9,
                data.Answer10,
                data.RightAnswer,
                data.IsActive,
                data.AddedDate,
                Adddate,
                data.ModifiedDate,
                data.ModifiedBy,
                data.FileDocument,
                data.Audio,
                data.Video,
                data.Image,
            ]
        );
    } catch (error) {
        console.log(error);
    }
};
