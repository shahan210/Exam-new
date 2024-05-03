import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import SubjectRoute from "./Router/Subject/Router.js";
import ClassRoute from "./Router/Class/Router.js";
import connectToDatabase from "./middleware/db.connection.js";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
connectToDatabase();
app.use(express.json());

// Routes
app.use("/api/v1/", SubjectRoute);
app.use("/api/v1/", ClassRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
