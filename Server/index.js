import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import SubjectRoute from "./Router/Subject/Router.js";
import ClassRoute from "./Router/Class/Router.js";
import UserRoute from "./Router/User/Router.js";
import ExamRouter from "./Router/Exam/Router.js";
import StudentRouter from "./Router/student/Router.js";
import connectToDatabase from "./middleware/db.connection.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.static("uploads"));

const port = process.env.PORT || 5324;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
connectToDatabase();
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/", SubjectRoute);
app.use("/api/v1/", ClassRoute);
app.use("/api/v1/", UserRoute);
app.use("/api/v1/", ExamRouter);
app.use("/api/v2/", StudentRouter);

app.get("/api/v1/download-excel", (req, res) => {
  const file = path.resolve(__dirname, "../Server/uploads/blankQuestionModel.xlsx");
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
