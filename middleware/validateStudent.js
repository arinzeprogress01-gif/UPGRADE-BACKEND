import { request } from "express";
import {students}  from "../data/studentDB.js";

export const validateStudent = (req, res, next) => {
    const { name, class: studentClass, payment } = req.body;

    if (!name || !studentClass || typeof payment !== "boolean") {
        return res.status(400).json({
            error: "Invalid student data"
        });
    }
    req.body = {
        name,
        class: studentClass,
        payment
    };
    next();
};

export const validateStudentId = (req, res, next) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid student id"
        });

    
    }
    req.studentId = id;
    
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            error : "Id Does not Exist"
        });
    }
    next(); 
};

