import pool from "../Config/config.js";
const connectToDatabase = (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to MySQL database:", err);
            return res.status(500).send("Error connecting to database");
        }

        req.dbConnection = connection;
        console.log("Connected to MySQL database");

        next();
    });
};

export default connectToDatabase;
