import joi from "joi";

export const createStudentSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    class: joi.string().min(3).max(100).required(),
    payment: joi.boolean().required()
});