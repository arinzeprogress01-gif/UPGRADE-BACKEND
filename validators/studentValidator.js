import joi from "joi";

export const createStudentSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    class: joi.string().min(3).max(100).required(),
    course: joi.string().min(5).max(100).required(),
    age: joi.number().min(2).max(3).required(),
    gender: joi.string().min(4).max(6).required()
});