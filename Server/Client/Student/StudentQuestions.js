import pool from "../../Config/config.js";

export const addQuestions = async (req, res) => {
  let questionDetails = req.body;
  const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const insertRowQuery =
    "INSERT INTO examquestionstatus (QuestionBankID,QuestionTestID,ExamQuestionID,StudentYearID,StudentID,RefixSlno,MTSeleAnswer,RightAnsw,MTMark,MTHour,MTMin,MTSec,AddedDate,AttType,StdExamID) VALUES ?";

  const dataArray = questionDetails.map((student) => [
    student.QuestionBankID,
    student.QuestionTestID,
    student.QuestionBankID.toString() + student.StudentYearID.toString(),
    student.StudentYearID,
    student.StudentID,
    student.QuestionBankID.toString() + student.StudentYearID.toString(),
    0,
    student.RightAnsw,
    1,
    0,
    0,
    0,
    Adddate,
    0,
    student.QuestionBankID.toString() + student.StudentYearID.toString(),
  ]);
  const getData = await pool.query(
    "SELECT * FROM examquestionstatus  WHERE StudentID = ?",
    [questionDetails[0].StudentID]
  );
  try {
    if (getData[0].length > 0) {
      res.status(200).json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "Already Created",
            ErrorCode: "",
            JSONData1: [],
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
        message: "failed",
      });
    } else {
      const result = await pool.query(
        insertRowQuery,
        [dataArray],
        (error, results, fields) => {
          if (error) {
            console.error("Error inserting data:", error);
            return;
          }
          console.log("Data inserted successfully:", results);
        }
      );
      if (result.length > 0) {
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
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateQuestion = async (req, res) => {

  // get all necesary fields then just update carefull with time 
  const get =
    "INSERT INTO examquestionstatus (QuestionBankID,QuestionTestID,ExamQuestionID,StudentYearID,StudentID,RefixSlno,MTSeleAnswer,RightAnsw,MTMark,MTHour,MTMin,MTSec,AddedDate,AttType,StdExamID) VALUES ?";
  try {
  } catch (error) {}
};
