import {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudentPartial,
    replaceStudent
} from "../services/studentService.js";

export const getStudents = (req, res) => {
    const students = getAllStudents();
        
    res.status(200).json(students);
};

export const getStudent = (req, res) => {
   
    const student = getStudentById(req.studentId);
    
    res.status(200).json(student);
};

export const addStudent = (req, res) => {

    const newStudent = createStudent({
        name: req.body.name,
        class: req.body.class,
        payment: req.body.payment
    });

    res.status(201).json(newStudent);
};

export const removeStudent = (req, res) => {

    const deleted = deleteStudent(req.studentId);

    if (!deleted) {
        throw new Error("Student not found");
    }

    res.status(200).json({ message: "Student deleted" });
};
export const patchStudent = (req, res) => {
    
    const updated = updateStudentPartial(req.studentId, req.body);

    if (!updated) {
        throw new Error("Student not found");
    }

    res.status(200).json(updated);
};

export const putStudent = (req, res) => {

    const replaced = replaceStudent(req.studentId, {
        name: req.body.name,
        class: req.body.class,
        payment: req.body.payment
    });

    if (!replaced) {
        throw new Error("Student not found");
    }

    res.status(200).json(replaced);
};

