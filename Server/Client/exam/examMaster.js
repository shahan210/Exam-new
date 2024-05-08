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

    try {
        const result = await pool.query("SELECT * FROM examdefinitiontmst WHERE QuestionTestID = ?;", [id]);
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

    const examInfo = await pool.query("SELECT * FROM examdefinitiontmst WHERE QuestionTestID = ?;", [id]);
    const data = examInfo[0][0];

    const result = {
        QuestionBankID: "",
        QuestionTestID: id,
        QuestionGroupID: "",
        QuestionGroupSLNO: "",
        QuestionGroupType: "",
        ClassId: data?.ClassId,
        SubjectID: data?.SubjectID,
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
    console.log(JSON.parse(data.data), "data");
    const quesData = JSON.parse(data.data);

    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // const pa = JSON.parse(data.data);
    // const dateStr = new Date(pa.ExamDateStr);
    // const dated = new Date(dateStr);
    // const formattedDate = dated.toISOString().slice(0, 19).replace("T", " ");

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
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );`,
            [
                quesData.QuestionBankID,
                quesData.QuestionTestID,
                quesData.QuestionGroupID,
                quesData.QuestionGroupSLNO,
                quesData.QuestionGroupType,
                quesData.ClassId,
                quesData.SubjectID,
                quesData.ClassSubjectMasterId,
                quesData.ChapterID,
                quesData.QuestionTypeID,
                quesData.QuestionDesc01,
                quesData.QuestionDesc02,
                quesData.Practical,
                quesData.Remarks,
                quesData.Qalerts,
                quesData.Question1,
                quesData.Answer,
                quesData.Answer1,
                quesData.Answer2,
                quesData.Answer3,
                quesData.Answer4,
                quesData.Answer5,
                quesData.Answer6,
                quesData.Answer7,
                quesData.Answer8,
                quesData.Answer9,
                quesData.Answer10,
                quesData.RightAnswer,
                quesData.IsActive,
                Adddate,
                data.AddedBy,
                quesData.ModifiedDate,
                quesData.ModifiedBy,
                quesData.FileDocument,
                quesData.Audio,
                quesData.Video,
                quesData.Image,
            ]
        );
    } catch (error) {
        console.log(error);
    }
};

export const getExamMasterEditInfo = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM examdefinitiontmst WHERE QuestionTestID = ?;", [id]);
        const question = await pool.query("SELECT * FROM questionbankmst WHERE QuestionTestID = ?;", [id]);
        console.log(question[0], "quesData");
        if (result.length > 0) {
            res.json({
                data: [
                    {
                        ActionType: "",
                        ErrorMessage: "",
                        ErrorCode: "",
                        JSONData1: [result],
                        JSONData2: [question],
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

export const getQuizMasterEditInfo = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM questionbankmst WHERE QuestionBankID = ?;", [id]);
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

export const editExamMasterInfo = async (req, res) => {
    const data = req.body;
    const pa = JSON.parse(data.data);
    // console.log(pa, "data");
    const dateStr = new Date(pa.ExamDate);
    const dated = new Date(dateStr);
    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const formattedDate = dated.toISOString().slice(0, 19).replace("T", " ");

    const updateQuery = `
        UPDATE examdefinitiontmst
        SET
            AcaYear = ?,
            ModifiedDate = ?,
            ExamName = ?,
            ClassId = ?,
            SubjectID = ?,
            ExamDate = ?,
            AddedBy = ?,
            ALTMTHour = ?,
            ALTMTMin = ?,
            ALTMTSec = ?,
            ExamHeading = ?,
            ExamSubHeading = ?
        WHERE
            QuestionTestID = ?;
    `;
    const updateValues = [
        pa.AcaYear,
        Adddate,
        pa.ExamName,
        pa.ClassId,
        pa.SubjectID,
        formattedDate,
        pa.AddedBy,
        pa.ALTMTHour,
        pa.ALTMTMin,
        pa.ALTMTSec,
        pa.ExamHeading,
        pa.ExamSubHeading,
        pa.QuestionTestID,
    ];

    try {
        const result = await pool.query(updateQuery, updateValues);
        if (result.length > 0) {
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

export const updateQuizMasterEditInfo = async (req, res) => {
    const data = req.body;
    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const pa = JSON.parse(data.data);
    console.log(pa, "reunoajsdflk;j");

    const updateQuery = `
    UPDATE questionbankmst
    SET
        QuestionTestID = ?,
        QuestionGroupID = ?,
        QuestionGroupSLNO = ?,
        QuestionGroupType = ?,
        ClassId = ?,
        SubjectID = ?,
        ClassSubjectMasterId = ?,
        ChapterID = ?,
        QuestionTypeID = ?,
        QuestionDesc01 = ?,
        QuestionDesc02 = ?,
        Practical = ?,
        Remarks = ?,
        Qalerts = ?,
        Question1 = ?,
        Answer = ?,
        Answer1 = ?,
        Answer2 = ?,
        Answer3 = ?,
        Answer4 = ?,
        Answer5 = ?,
        Answer6 = ?,
        Answer7 = ?,
        Answer8 = ?,
        Answer9 = ?,
        Answer10 = ?,
        RightAnswer = ?,
        IsActive = ?,
        AddedDate = ?,
        AddedBy = ?,
        ModifiedDate = ?,
        ModifiedBy = ?,
        FileDocument = ?,
        Audio = ?,
        Video = ?,
        Image = ?
    WHERE
        QuestionBankID = ?;
`;

    const updatedData = [
        pa.QuestionTestID,
        pa.QuestionGroupID,
        pa.QuestionGroupSLNO,
        pa.QuestionGroupType,
        pa.ClassId,
        pa.SubjectID,
        pa.ClassSubjectMasterId,
        pa.ChapterID,
        pa.QuestionTypeID,
        pa.QuestionDesc01,
        pa.QuestionDesc02,
        pa.Practical,
        pa.Remarks,
        pa.Qalerts,
        pa.Question1,
        pa.Answer,
        pa.Answer1,
        pa.Answer2,
        pa.Answer3,
        pa.Answer4,
        pa.Answer5,
        pa.Answer6,
        pa.Answer7,
        pa.Answer8,
        pa.Answer9,
        pa.Answer10,
        pa.RightAnswer,
        pa.IsActive,
        pa.AddedDate,
        pa.AddedBy,
        Adddate,
        pa.ModifiedBy,
        pa.FileDocument,
        pa.Audio,
        pa.Video,
        pa.Image,
        pa.QuestionBankID,
    ];

    try {
        const result = await pool.query(updateQuery, updatedData);
        if (result.length > 0) {
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
