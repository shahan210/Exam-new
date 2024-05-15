import pool from "../../Config/config.js";

export const getExams = async (req, res) => {
  let classname = req.body.class;
  let year = req.body.date;
  const today = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .slice(0, 10);  
  console.log(today);
  try {
    const getClass = await pool.query(
      "SELECT ClassId FROM classmaster WHERE QstClass = ?",
      [classname]
    );
    console.log(getClass[0][0]);
    if (getClass[0].length > 0) {
      const getExam = await pool.query(
        "SELECT QuestionTestID, AcaYear, ExamName, SubjectID FROM examdefinitiontmst WHERE ClassID = ? AND DATE_FORMAT(ExamDate, '%Y-%m-%d') LIKE ? ",
        [getClass[0][0].ClassId, today]
      );
      if (getExam[0].length > 0) {
        const getSubject = await pool.query(
          "SELECT SubjectName FROM subjectsmaster WHERE SubjectID = ?",
          [getExam[0][0].SubjectID]
        );

        const newdata = [getExam[0], getSubject[0]];

        if (getSubject[0].length > 0) {
          res.status(200).json({
            data: [
              {
                ActionType: "",
                ErrorMessage: "",
                ErrorCode: "",
                JSONData1: newdata,
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
                JSONData1: newdata,
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
    } else {
      res.status(200).json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
            ErrorCode: "",
            JSONData1: newdata,
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
