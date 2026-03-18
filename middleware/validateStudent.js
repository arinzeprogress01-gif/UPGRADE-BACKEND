import loggerUtils from '../utils/loggerUtils.js';
import students from "../data/studentDB.js";
import { createStudentSchema } from "../validators/studentValidator.js";


export const validateStudent = (req, res, next) => {
    const { name, class: studentClass, payment } = req.body;

    if (!name || !studentClass || typeof payment !== "boolean") {
        loggerUtils.error(`Error: Invalid student data - ${JSON.stringify(req.body)}`);

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

        loggerUtils.error(`Error: Invalid student id - ${req.params.id}`);

        return res.status(404).json({
            error : "Id Does not Exist"

        });
        
    }
    
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