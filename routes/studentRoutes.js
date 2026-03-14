import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  removeStudent,
  patchStudent,
  putStudent
} from "../controllers/studentController.js";

import { validateDeleteStudent, validateGetStudentId, validateGetStudentId, validatePatchStudent, validatePutStudent, validateStudent } from "../middleware/validateStudent.js";

const router = express.Router();

router.get("/students", getStudents);

router.get("/students/:id",validateGetStudentId, getStudent);

router.post("/students", validateStudent, addStudent);

router.delete("/students/:id",validateDeleteStudent, removeStudent);

router.patch("/students/:id",validatePatchStudent, patchStudent);

router.put("/students/:id",validateStudent, validatePutStudent, putStudent);

export default router;