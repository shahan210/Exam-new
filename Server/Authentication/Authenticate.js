import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const verifyJwt = async (req, res, next) => {
  let token = req.body.headers.Authorization;
  if (!token) {
    return res.json("Access Denied");
  } else {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.VITE_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        next();
      }
    });
  }
};
export const verifyJwtGet = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.json("Access Denied");
  } else {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.VITE_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        next();
      }
    });
  }
};
export const verifyJwtExam = async (req, res, next) => {
  let token = req.body.headers.Authorization;
  if (!token) {
    return res.json("Access Denied");
  } else {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.VITE_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        next();
      }
    });
  }
};
export const verifyJwtExamGet = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.json("Access Denied");
  } else {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.VITE_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        next();
      }
    });
  }
};
