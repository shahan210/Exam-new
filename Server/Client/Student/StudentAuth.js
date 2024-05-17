import pool from "../../Config/config.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const authStudent = async (req, res) => {
  const userDetails = req.body;
  const decodedPassword =
    userDetails.password && atob(userDetails.password).split("student")[0];

  try {
    function encodePasswords(credentials) {
      return credentials.map((cred) => {
        const encodedPassword = btoa(cred.PASSWORD + "student");
        return { ...cred, PASSWORD: encodedPassword };
      });
    }
    const result = await pool.query(
      "SELECT * FROM studentmaster WHERE ADMNO = ? AND PASSWORD = ?",
      [userDetails.id, decodedPassword]
    );
    const joinQuery = await pool.query(
      `SELECT studentmaster.ADMNO,studentmaster.PASSWORD, studentmaster.SNAME,studentmaster.StudentID , studentyearmaster.CLNAME,studentyearmaster.SECNAME,studentyearmaster.StudentYearID  FROM studentmaster INNER JOIN studentyearmaster ON studentmaster.STDMSTID = studentyearmaster.STDMSTID WHERE studentmaster.StudentID = '${result[0][0].StudentID}' AND studentmaster.StudentID = '${result[0][0].StudentID}';`
    );
    const data1 = encodePasswords(joinQuery[0]);

    if (joinQuery[0].length > 0) {
      const id = joinQuery[0].map((item) => item.StudentID)[0];
      const access = jwt.sign(
        {
          id,
        },
        process.env.VITE_REFRESH_TOKEN,
        { expiresIn: 21600 }
      );
      res.json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
            ErrorCode: "",
            JSONData1: data1,
            access,
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
            JSONData1: data1,
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
        message: "User Not Found",
        status: 404,
      });
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
