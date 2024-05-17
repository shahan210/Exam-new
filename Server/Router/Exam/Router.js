import express from "express";
import {
    UploadImages,
    createExamMaster,
    createdQuestionMaster,
    editExamMasterInfo,
    getExamMaster,
    getExamMasterEditInfo,
    getExamMasterInfo,
    getQuizMasterEditInfo,
    getYearClassSubjectWiseList,
    newQuestionMaster,
    updateQuizMasterEditInfo,
} from "../../Client/exam/examMaster.js";
import multer from "multer";
import { fileFilter, storage } from "../../middleware/multer.js";
import { uploadImage } from "../../Client/exam/ImageUploader.js";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";
import XLSX from "xlsx";
import pool from "../../Config/config.js";

const filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const paths = `./uploads`;
        fs.mkdirSync(paths, { recursive: true });
        return cb(null, paths);
    },

    filename: function (req, file, cb) {
        const fileExtension = file.originalname;
        const dynamicFilename = "file" + fileExtension;
        cb(null, dynamicFilename);
    },
});

const upload = multer({ fileFilter: fileFilter, storage });
const fileUpload = multer({ storage: filestorage });

const router = express.Router();

router.get("/exam", getExamMaster);
router.post("/exam", getYearClassSubjectWiseList);
router.post("/examCreate", createExamMaster);
router.get("/examMaster/:id", getExamMasterInfo);
router.get("/examMasteredit/:id", getExamMasterEditInfo);
router.put("/examMasteredit", editExamMasterInfo);
router.get("/quesMasteredit/:id", getQuizMasterEditInfo);
router.put("/quesMasteredit", updateQuizMasterEditInfo);
router.get("/createnewquestion/:id", newQuestionMaster);
router.post("/createdQuestionMaster", createdQuestionMaster);
router.post("/uploadQuestionImages", upload.array("images"), UploadImages);
router.post("/uploadQuestionfile", fileUpload.single("files"), (req, res) => {
    // console.log(req.file, "file");
    // console.log(req.body, "body");

    let csvData = [];
    // fs.createReadStream(req.file.path)
    //     .pipe(csvParser())
    //     .on("data", (row) => {
    //         csvData.push(row);
    //     })
    //     .on("end", () => {
    //         csvData.map((data) => {
    //             console.log(data," files");
    //         })

    //     });

    const classID = req.body.classID;
    const subID = req.body.subID;
    const examID = req.body.examID;

    // console.log(classID, subID, examID);

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname);

    if (fileExtension !== ".xls" && fileExtension !== ".xlsx") {
        return res.status(400).send("Invalid file format. Please upload an Excel file.");
    }

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    // console.log(workbook, "workbook");
    const sheet_name_list = workbook.SheetNames;
    // console.log(sheet_name_list, " sheeeeeeeeet");
    const sheet = workbook.Sheets[sheet_name_list[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
    // console.log(jsonData, "jsondata");

    let lengthofrespone = [];

    let questionData = {
        QuestionBankID: "",
        QuestionTestID: parseInt(examID),
        QuestionGroupID: "",
        QuestionGroupSLNO: "",
        QuestionGroupType: "",
        ClassId: parseInt(classID),
        SubjectID: parseInt(subID),
        ClassSubjectMasterId: "",
        ChapterID: "",
        QuestionTypeID: "",
        QuestionDesc01: "",
        QuestionDesc02: "",
        Mark: "",
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

    // Prepare data for insertion
    let dataToInsert = Promise.all(
        jsonData.map(async (row) => {
            let rightans;
            if (row["Right Ans"] == "A") rightans = 1;
            if (row["Right Ans"] == "B") rightans = 2;
            if (row["Right Ans"] == "C") rightans = 3;
            if (row["Right Ans"] == "D") rightans = 4;
            const data = {
                ...questionData,
                Answer1: row["OPT A"],
                Answer2: row["OPT B"],
                Answer3: row["OPT C"],
                Answer4: row["OPT D"],
                Question1: row.Question,
                RightAnswer: rightans,
                AddedDate: Adddate,
            };
            // console.log(data, "data");

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
            Mark,
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
        );`,
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
                    data.Mark,
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
                    Adddate,
                    data.AddedBy,
                    data.ModifiedDate,
                    data.ModifiedBy,
                    data.FileDocument,
                    data.Audio,
                    data.Video,
                    data.Image,
                ]
            );
            // console.log(row.SLNO, "data");
            console.log(response, " response");
            lengthofrespone.push(response);
            console.log(lengthofrespone.length, "dddddddddddd");
        })
    );
    console.log(lengthofrespone, "hhhhhhhh");
    // console.log(dataToInsert);
});

export default router;
