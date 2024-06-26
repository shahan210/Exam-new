import pool from "../../Config/config.js";

export const getExams = async (req, res) => {
  let classname = req.body.class;
  let year = req.body.date;
  const today = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .slice(0, 10);
  try {
    const getClass = await pool.query(
      "SELECT ClassId FROM classmaster WHERE QstClass = ?",
      [classname]
    );

    if (getClass[0].length > 0) {
      const getExam = await pool.query(
        "SELECT  examdefinitiontmst.QuestionTestID,examdefinitiontmst.AcaYear,examdefinitiontmst.ExamName,examdefinitiontmst.SubjectID,examdefinitiontmst.ALTMTHour, examdefinitiontmst.ALTMTMin, examdefinitiontmst.ALTMTSec, subjectsmaster.SubjectName FROM  examdefinitiontmst  INNER JOIN  subjectsmaster ON examdefinitiontmst.SubjectID = subjectsmaster.SubjectID WHERE examdefinitiontmst.ClassId = ? AND DATE_FORMAT(ExamDate, '%Y-%m-%d') LIKE ? ",
        [getClass[0][0].ClassId, today]
      );

      if (getExam[0].length > 0) {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
              ErrorCode: "",
              JSONData1: getExam[0],
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
              JSONData1: getExam[0],
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
      res.status(200).json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
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
        message: "no data found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async (req, res) => {
  let examID = req.params.id;
  const result = await pool.query(
    `SELECT 
 questionbankmst.QuestionBankID,
    questionbankmst.QuestionTestID,
    questionbankmst.SubjectID,
    questionbankmst.Question1,
    questionbankmst.Answer,
    questionbankmst.Answer1,
    questionbankmst.Answer2,
    questionbankmst.Answer3,
    questionbankmst.Answer4,
    questionbankmst.Answer5,
    questionbankmst.Answer6,
    questionbankmst.RightAnswer,
    questionbankmst.AddedDate,
    questionbankmst.Mark,
    questionbankmst.ClassId,
    questionimages.QuizTittle,
    questionimages.Answer1 AS ImageAnswer1,
    questionimages.Answer2 AS ImageAnswer2,
    questionimages.Answer3 AS ImageAnswer3,
    questionimages.pathName,
    questionimages.Answer4 AS ImageAnswer4
FROM 
    questionbankmst
JOIN 
    questionimages 
ON 
    questionbankmst.QuestionBankID = questionimages.QuestionBankID
WHERE 
    questionbankmst.QuestionTestID = ?;
`,
    [examID]
  );
  console.log(result);
  const resultImages = await pool.query(
    "SELECT * FROM questionimages WHERE QuestionBankID = ?;",
    [examID]
  );

  try {
    if (result[0].length > 0) {
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
            JSONData1Remarks: "question",
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

export const upcomingExams = async (req, res) => {
  let classname = req.body.class;
  const today = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .slice(0, 10);
  const getClass = await pool.query(
    "SELECT ClassId from classmaster WHERE QstClass = ?",
    [classname]
  );
  const result = await pool.query(
    "SELECT QuestionTestID, AcaYear, ExamName, ExamDate, SubjectID FROM examdefinitiontmst WHERE  ExamDate > CURDATE()",
    [getClass[0][0].ClassId]
  );
  try {
    if (getClass[0].length > 0) {
      const result = await pool.query(
        "SELECT QuestionTestID, AcaYear, ExamName, ExamDate, SubjectID FROM examdefinitiontmst WHERE  ExamDate > CURDATE()",
        [getClass[0][0].ClassId]
      );
      if (result[0].length > 0) {
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
      res.status(200).json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
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
        message: "no data found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStudentExam = async (req, res) => {
  const data = req.body;
  try {
    const check = await pool.query(
      "SELECT FinalSubmitYN FROM examstudentstatus WHERE StudentID = ? AND QuestionTestID =?",
      [data.StudentID, data.QuestionTestID]
    );
    const get = await pool.query(
      "SELECT * FROM examstudentstatus WHERE StudentID = ?",
      [data.StudentID]
    );

    if (check[0].length > 0) {
      if (check[0][0]?.FinalSubmitYN == 1) {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "Exam has been completed",
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
          message: "no data found",
        });
      } else {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
              ErrorCode: "",
              JSONData1: get[0],
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
      const result = await pool.query(
        "INSERT INTO examstudentstatus (StudentYearID,StudentID,QuestionTestID,FinalSubmitYN) VALUES (?,?,?,?)",
        [data.StudentYearID, data.StudentID, data.QuestionTestID, "0"]
      );
      if (result.length > 0) {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
              ErrorCode: "",
              JSONData1: [result[0]],
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
        });
      } else {
        res.status(200).json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
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
          message: "Failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const completeExam = async (req, res) => {
  let id = req.body.id;
  try {
    const result = pool.query(
      "UPDATE examstudentstatus SET FinalSubmitYN = ? WHERE StudentID = ?",
      [1, id]
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

export const checkExam = async (req, res) => {
  let id = req.body;
  console.log(1);
  try {
    const result = await pool.query(
      "SELECT * FROM examstudentstatus WHERE StudentID = ? AND QuestionTestID = ?",
      [id.StudentID, id.QuestionTestID]
    );
    console.log(result);
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
