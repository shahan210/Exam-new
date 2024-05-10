import pool from "../../Config/config.js";
export const uploadImage = async (data) => {

    const result = await pool.query(
        `UPDATE questionimages 
    SET  
        ${data.body.fileName} = '${data.file.filename}', 
        pathName = '${data.file.path}' 
    WHERE 
        QuestionBankID = ${data.body.id};`
    );
    return result;
};
