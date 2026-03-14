import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  removeStudent,
  patchStudent,
  putStudent
} from "../controllers/studentController.js";

import { validateStudentId, validateStudent } from "../middleware/validateStudent.js";

const router = express.Router();

router.get("/students", getStudents);

router.get("/students/:id",validateStudentId, getStudent);

router.post("/students", validateStudent, addStudent);

router.delete("/students/:id", removeStudent);

router.patch("/students/:id", patchStudent);

router.put("/students/:id",validateStudent, putStudent);

export default router;