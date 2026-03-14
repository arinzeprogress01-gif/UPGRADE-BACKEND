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
    const id = Number(req.params.id);

    const student = getStudentById(id);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
};

export const addStudent = (req, res) => {
    const { name, class: studentClass, payment } = req.body;

    if (!name || !studentClass || typeof payment !== "boolean") {
        return res.status(400).json({ error: "Invalid student data" });
    }

    const newStudent = createStudent({
        name,
        class: studentClass,
        payment
    });

    res.status(201).json(newStudent);
};

export const removeStudent = (req, res) => {
    const id = Number(req.params.id);

    const deleted = deleteStudent(id);

    if (!deleted) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted" });
};
export const patchStudent = (req, res) => {
    const id = Number(req.params.id);

    const updated = updateStudentPartial(id, req.body);

    if (!updated) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(updated);
};

export const putStudent = (req, res) => {
    const id = Number(req.params.id);

    const { name, class: studentClass, payment } = req.body;

    if (!name || !studentClass || typeof payment !== "boolean") {
        return res.status(400).json({ error: "Invalid student data" });
    }

    const replaced = replaceStudent(id, {
        name,
        class: studentClass,
        payment
    });

    if (!replaced) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(replaced);
};

