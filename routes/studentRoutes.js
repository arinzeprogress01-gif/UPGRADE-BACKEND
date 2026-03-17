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

import {validateStudentData} from  "../middleware/validateStudent.js";


const router = express.Router();

router.get("/students", getStudents);

router.get("/students/:id",validateStudentId, getStudent);

router.post("/students", validateStudentData, addStudent);

router.delete("/students/:id", validateStudentId, removeStudent);

router.patch("/students/:id",validateStudentId, patchStudent);

router.put("/students/:id",validateStudentData,validateStudentId, validateStudent, putStudent);

export default router;