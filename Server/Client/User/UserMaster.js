import pool from "../../Config/config.js";

export const getUsers = async (req, res) => {
  function encodePasswords(credentials) {
    return credentials.map((cred) => {
      const encodedPassword = btoa(cred.UserPassword + "password");
      return { ...cred, UserPassword: encodedPassword };
    });
  }
  try {
    const result = await pool.query("SELECT * FROM adminuserlogins");

    if (result[0].length > 0) {
      const data = encodePasswords(result[0]);
      res.json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
            ErrorCode: "",
            JSONData1: data,
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
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
export const getRights = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM adminuserrights");
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

export const CreateUser = async (req, res) => {
  const newData = req.body;
  const Adddate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const decodedPassword = atob(newData.UserPassword).split("password")[0];

  try {
    const result = await pool.query(
      "INSERT INTO adminuserlogins (UserName, UserPassword , UserType, EmailID, PhNo,UserLocation, AddedDate, AddedBy, RightsDetails) VALUES (?,?,?,?,?,?,?,?,?);",
      [
        newData.UserName,
        decodedPassword,
        newData.UserType,
        newData.EmailID,
        newData.PhNo,
        newData.UserLocation,
        Adddate,
        newData.AddedBy,
        newData.RightsDetails,
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
        message: "no data found",
        status: 404,
      });
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificUser = async (req, res) => {
  function encodePasswords(credentials) {
    return credentials.map((cred) => {
      const encodedPassword = btoa(cred.UserPassword + "password");
      return { ...cred, UserPassword: encodedPassword };
    });
  }
  const id = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM adminuserlogins WHERE LoginID = ?; ",
      [id]
    );
    if (result[0].length > 0) {
      const data = encodePasswords(result[0]);

      res.json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
            ErrorCode: "",
            JSONData1: data,
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
        message: "no data found",
        status: 200,
      });
    }
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const ModifiedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const decodedPassword = atob(newData.UserPassword).split("password")[0];
  try {
    const result = await pool.query(
      "UPDATE adminuserlogins SET UserName = ?, UserPassword = ?, UserType = ?,EmailID = ?, PhNo = ?, UserLocation = ?, ModifiedDate = ?, ModifiedBy = ?, RightsDetails = ? WHERE LoginID = ?;",
      [
        newData.UserName,
        decodedPassword,
        newData.UserType,
        newData.EmailID,
        newData.PhNo,
        newData.UserLocation,
        ModifiedDate,
        newData.ModifiedBy,
        newData.RightsDetails,
        id,
      ]
    );
    if (result.length > 0) {
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

export const updateUserSubjects = async (req, res) => {
  const id = req.body.id;
  const userClass = req.body.class;
  const userSubjects = req.body.subjects;
  console.log(userClass, id, userSubjects);
  const values = userSubjects.map((subjectId, index) => [
    subjectId,
    userClass[index],
    id,
  ]);
  const insertRowQuery = `
  INSERT INTO adminusersubjects (SubjectID, ClassId, LoginID) VALUES ?
`;
  if (userClass.length > 0 && userSubjects.length > 0) {
    try {
      const deleteAll = await pool.query(
        "DELETE FROM adminusersubjects WHERE LoginiD = ?",
        [id],
        (err, results) => {
          if (err) {
            return connection.rollback(() => {
              console.error("Error deleting rows:", err);
              throw err;
            });
          }
        }
      );
      const result = await pool.query(
        insertRowQuery,
        [values],
        (err, results, fields) => {
          if (err) {
            console.error("Error inserting rows:", err);
            return;
          }
          console.log("Rows inserted successfully");
        }
      );
      console.log(result);
      if (result.length > 0) {
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
      } else {
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
          message: "no data found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json("No Class and Subject found");
  }
};

export const createUserSubjects = async (req, res) => {
  const id = req.body.id;
  const userClass = req.body.class;
  const userSubjects = req.body.subjects;
  console.log(id, userClass, userSubjects);
  const values = userSubjects.map((subjectId, index) => [
    subjectId,
    userClass[index],
    id,
  ]);
  const insertRowQuery = `
    INSERT INTO adminusersubjects (SubjectID, ClassId, LoginID) VALUES ?
  `;
  if (userClass.length > 0 && userSubjects.length > 0) {
    try {
      const result = await pool.query(
        insertRowQuery,
        [values],
        (err, results, fields) => {
          if (err) {
            console.error("Error inserting rows:", err);
            return;
          }
          console.log("Rows inserted successfully");
        }
      );
      if (result.length > 0) {
        res.json({
          data: [
            {
              ActionType: "",
              ErrorMessage: "",
              ErrorCode: "",
              JSONData1: result,
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
          message: "no data found",
          status: 404,
        });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json("No Class and Subjects found");
  }
};
export const getUsersSubject = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await pool.query(
      "SELECT * FROM adminusersubjects WHERE LoginId = ?",
      [id]
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
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
