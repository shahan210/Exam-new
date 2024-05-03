import pool from "../Config/config.js";
const connectToDatabase = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL database:", err);
      return res.status(500).send("Error connecting to database");
    }

    // Connection was successful, attach the connection to the request object
    req.dbConnection = connection;
    console.log("Connected to MySQL database");

    // Call next to proceed to the next middleware or route handler
    next();
  });
};

export default connectToDatabase;
