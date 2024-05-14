import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import SubjectRoute from "./Router/Subject/Router.js";
import ClassRoute from "./Router/Class/Router.js";
import UserRoute from "./Router/User/Router.js";
import ExamRouter from "./Router/Exam/Router.js";
import StudentRouter from "./Router/student/Router.js";
import connectToDatabase from "./middleware/db.connection.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.static("uploads"));

const port = process.env.PORT || 5324;

app.use(cors());
connectToDatabase();
app.use(express.json());

// Routes
app.use("/api/v1/", SubjectRoute);
app.use("/api/v1/", ClassRoute);
app.use("/api/v1/", UserRoute);
app.use("/api/v1/", ExamRouter);
app.use("/api/v2/", StudentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
