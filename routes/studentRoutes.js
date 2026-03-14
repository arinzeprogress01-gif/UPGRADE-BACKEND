import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  removeStudent,
  patchStudent,
  putStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getStudents);

router.get("/students/:id", getStudent);

router.post("/students", addStudent);

router.delete("/students/:id", removeStudent);

router.patch("/students/:id", patchStudent);

router.put("/students/:id", putStudent);

export default router;