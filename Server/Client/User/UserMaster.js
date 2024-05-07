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

    const hashed = result.data;
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
    console.log(result);
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
  console.log(newData);
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
