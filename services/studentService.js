import Student from "../models/Students.js";

export const getAllStudents = async () => {
    return await Student.find();
};

export const getStudentById = async (id) => {
    return await Student.findById(id);
};

export const createStudent = async (data) => {
    return await Student.create(data)
};

export const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
};

export const updateStudentPartial = async (id, data) => {
    return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const replaceStudent = async (id, data) => {
    return await Student.findByIdAndUpdate(id, data, { new: true });
}