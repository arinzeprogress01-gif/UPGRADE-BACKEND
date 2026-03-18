import loggerUtils from '../utils/loggerUtils.js';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudentPartial,
    replaceStudent
} from "../services/studentService.js";

export const getStudents = (_req, res) => {
    const students = getAllStudents();
    loggerUtils.info("All students retrieved successfully");
    res.status(200).json(students);
};

export const getStudent = (req, res) => {
   
    const student = getStudentById(req.studentId);
    loggerUtils.info(`Student with ID ${req.studentId} retrieved successfully`);
    res.status(200).json(student);
};

export const addStudent = (req, res) => {

    const newStudent = createStudent({
        name: req.body.name,
        class: req.body.class,
        payment: req.body.payment
    });
    loggerUtils.info(`Student with ID ${newStudent.id} created successfully`);
    res.status(201).json(newStudent);
};

export const removeStudent = (req, res) => {
    const deleted = deleteStudent(req.studentId);

    if (!deleted) {
        loggerUtils.error(`CANNOT DELETE: ID ${req.studentId} NOT FOUND IN DATABASE`);
        return res.status(404).json({ message: "Student not found" });
    }  
    loggerUtils.info(`Student with ID ${req.studentId} deleted successfully`);
    res.status(200).json({ message: "Student deleted" });
};
export const patchStudent = (req, res) => {
    
    const updated = updateStudentPartial(req.studentId, req.body);

    if (!updated) {
        loggerUtils.error(`CANNOT UPDATE: ID ${req.studentId} NOT FOUND IN DATABASE`);
        return res.status(404).json({ message: "Student not found" });
    }
    loggerUtils.info(`Student with ID ${req.studentId} updated successfully`);

    res.status(200).json(updated);
};

export const putStudent = (req, res) => {

    const replaced = replaceStudent(req.studentId, {
        name: req.body.name,
        class: req.body.class,
        payment: req.body.payment
    });

    if (!replaced) {

        loggerUtils.error(`CANNOT REPLACE: ID ${req.studentId} NOT FOUND IN DATABASE`);
        return res.status(404).json({ message: "Student not found" });
    }

    loggerUtils.info(`Student with ID ${req.studentId} replaced successfully`);
    res.status(200).json(replaced);
};

