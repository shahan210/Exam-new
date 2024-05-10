import pool from "../../Config/config.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const authUser = async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails, 1);
  const decodedPassword =
    userDetails.UserPassword &&
    atob(userDetails.UserPassword).split("password")[0];
  try {
    const result = await pool.query(
      "SELECT * FROM adminuserlogins WHERE UserName = ? AND UserPassword = ?",
      [userDetails.UserName, decodedPassword]
    );
    if (result[0].length > 0) {
      const id = result[0].map((item) => item.LoginID)[0];
      const access = jwt.sign(
        {
          id,
        },
        process.env.VITE_ACCESS_TOKEN,
        { expiresIn: 86400 }
      );
      res.json({
        data: [
          {
            ActionType: "",
            ErrorMessage: "",
            ErrorCode: "",
            JSONData1: result[0],
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
        message: "User Not Found",
        status: 404,
      });
    }

    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};
