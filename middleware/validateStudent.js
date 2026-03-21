import mongoose from "mongoose";

import loggerUtils from '../utils/loggerUtils.js';

import { createStudentSchema } from "../validators/studentValidator.js";

export const validateStudent = (req, res, next) => {
    const { name, class: studentClass, course, gender, age } = req.body;

    if (!name || !studentClass || !course || !age || !gender) {
        loggerUtils.error(`Error: Invalid student data - ${JSON.stringify(req.body)}`);

        return res.status(400).json({

            error: "Invalid student data"

        });
    }
    req.body = {
        name,
        class: studentClass,
        course,
        age,
        gender
    };

    
    next();
};



export const validateStudentId = (req, res, next) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        loggerUtils.error(`Invalid MongoDB ${id}`);

        return res.status(400).json({
            error: "Invalid Student ID"
        });
    };

    req.studentId = id;
    next(); 
};



export const validateStudentData = (req, res, next) => {
    const { error } = createStudentSchema.validate(req.body);

    if (error) {
        loggerUtils.error(`Error: Invalid student data - ${error.details[0].message}`);
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    next();
};