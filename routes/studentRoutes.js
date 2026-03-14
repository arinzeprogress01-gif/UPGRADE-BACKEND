import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  removeStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getStudents);

router.get("/students/:id", getStudent);

router.post("/students", addStudent);

router.delete("/students/:id", removeStudent);

export default router;