import pool from "../../Config/config.js";

export const addQuestions = async (req, res) => {
  let questionDetails = req.body.data;
  console.log(questionDetails, "hhhh--------------------------------------------------");
  const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const insertRowQuery =
    "INSERT INTO examquestionstatus (QuestionBankID,QuestionTestID,ExamQuestionID,StudentYearID,StudentID,RefixSlno,MTSeleAnswer,RightAnsw,MTMark,MTHour,MTMin,MTSec,AddedDate,AttType,StdExamID) VALUES ?";

  const dataArray = questionDetails.map((student) => [
    student.QuestionBankID,
    student.QuestionTestID,
    student.QuestionBankID.toString() + student.StudentYearID.toString(),
    student.StudentYearID,
    student.StudentID,
    student.ButtonID,
    0,
    0,
    0,
    0,
    0,
    0,
    Adddate,
    0,
    student.QuestionBankID.toString() + student.StudentYearID.toString(),
  ]);
  const getData = await pool.query("SELECT * FROM examquestionstatus  WHERE StudentID = ? AND QuestionBankID = ?", [
    questionDetails[0].StudentID,
    questionDetails[0].QuestionBankID,
  ]);

  try {
    if (getData[0]?.length > 0) {
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
      const result = await pool.query(insertRowQuery, [dataArray], (error, results, fields) => {
        if (error) {
          console.error("Error inserting data:", error);
          return;
        }
        console.log("Data inserted successfully:");
      });

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
  let data = req.body.data;
  console.log(data);
  try {
    if (data.RightAnswer == data.MTSeleAnswer) {
      const result = await pool.query(
        "UPDATE examquestionstatus SET RightAnsw = ?, MTMark=?, MTSeleAnswer = ?, MTHour = ?, MTMin = ?, MTSeleAswText= ? , MTSec = ?, AttType = ? WHERE QuestionBankID= ? AND StudentID = ?;",
        [
          1,
          data.MTMark,
          data.MTSeleAnswer,
          data.MTHour,
          data.MTMin,
          data.MTSeleAswText,
          data.MTSec,
          data.AttType,
          data.QuestionBankID,
          data.StudentID,
        ]
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
    } else {
      const result1 = await pool.query(
        "UPDATE examquestionstatus SET RightAnsw=?,MTMark=?, MTSeleAnswer = ?, MTHour = ?, MTMin = ?, MTSeleAswText= ? , MTSec = ?, AttType = ? WHERE QuestionBankID= ? AND StudentID = ?;",
        [
          0,
          0,
          data.MTSeleAnswer,
          data.MTHour,
          data.MTMin,
          data.MTSeleAswText,
          data.MTSec,
          data.AttType,
          data.QuestionBankID,
          data.StudentID,
        ]
      );
      if (result1.length > 0) {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
              ErrorCode: "",
              JSONData1: result1[0],
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
              JSONData1: result1[0],
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

export const retreiveExam = async (req, res) => {
  let data = req.body;
  try {
    const result = await pool.query(
      "SELECT MTMin, QuestionBankID, MTHour,AddedDate, MTSec, AttType FROM examquestionstatus WHERE QuestionTestID=? AND StudentID=?",
      [data.QuestionTestID, data.StudentID]
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
  } catch (error) {
    console.log(error);
  }
};

export const results = async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    const result = await pool.query("SELECT * FROM examquestionstatus WHERE QuestionTestID = ? AND StudentID = ?; ", [
      data.QuestionTestID,
      data.StudentID,
    ]);
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
  } catch (error) {}
};
