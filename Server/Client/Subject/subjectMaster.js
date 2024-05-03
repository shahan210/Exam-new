import pool from "../../Config/config.js";

// get all
export const subjectGet = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subjectsmaster");
    if (result[0].length > 0) {
      res.json({
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
        message: "no data found",
      });
    }
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};
// create
export const CreateSubject = async (req, res) => {
  const newData = req.body;
  console.log(newData);
  const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const result = await pool.query(
      "INSERT INTO subjectsmaster (SubjectName,QDescription ,AddedDate,AddedBy,IsActive) VALUES (?,?,?,?,?);",
      [
        newData.SubjectName,
        newData.QDescription,
        Adddate,
        newData.AddedBy,
        newData.IsActive,
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
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
// get specific
export const editSubject = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await pool.query(
      "SELECT * FROM subjectsmaster WHERE subjectID = ?;",
      [id]
    );
    if (result[0].length > 0) {
      res.json({
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
        status: 200,
      });
    } else {
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
        message: "no data found",
      });
      console.log(result[0]);
    }
  } catch (error) {
    console.log(error);
  }
};
// update
export const UpdateSubject = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const ModifiedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const result = await pool.query(
      "UPDATE subjectsmaster SET SubjectName = ?, QDescription = ?, ModifiedDate = ?, ModifiedBy = ?, IsActive = ? WHERE SubjectID = ?;",
      [
        newData.SubjectName,
        newData.QDescription,
        ModifiedDate,
        newData.ModifiedBy,
        newData.IsActive,
        id,
      ]
    );
    console.log(result);
    if (result.length > 0) {
      res.json({
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
        status: 200,
      });
    } else {
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
        message: "no data found",
      });
      console.log(result[0]);
    }
  } catch (error) {
    console.log(error);
  }
};
