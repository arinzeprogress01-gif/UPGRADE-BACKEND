import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  removeStudent,
  patchStudent,
  putStudent
} from "../controllers/studentController.js";

import { validateStudentId, validateStudent, validateStudentData} from "../middleware/validateStudent.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/students",protect, getStudents);

router.get("/students/:id",protect, validateStudentId, getStudent);

router.post("/students",protect, validateStudentData,validateStudent, addStudent);

router.delete("/students/:id",protect, validateStudentId, removeStudent);

router.patch("/students/:id",protect, validateStudentId, patchStudent);

router.put("/students/:id",protect, validateStudentData, validateStudentId, validateStudent, putStudent);

export default router;