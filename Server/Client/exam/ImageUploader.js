import pool from "../../Config/config.js";
export const uploadImage = async (data) => {
    // console.log(data,'upload image');

    const result = await pool.query(
        "INSERT INTO questionimages (QuestionBankID, fileName , pathName, originalName) VALUES (?,?,?,?);",
        [
            data.body.id,
            data.file.filename,
            data.file.path,
            data.file.originalname,
        ]
    );
    return result
};
