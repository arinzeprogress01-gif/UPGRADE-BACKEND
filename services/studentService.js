import students from "../data/studentDB.js";

export const getAllStudents = () => {
    return students;
};

export const getStudentById = (id) => {
    return students.find(student => student.id === id);
};

export const createStudent = (data) => {
    const newStudent = {
        id: students.length + 1,
        ...data
    };

    students.push(newStudent);

    return newStudent;
};

export const deleteStudent = (id) => {
    const index = students.findIndex(student => student.id === id);

    if (index === -1) return null;

    const deleted = students.splice(index, 1);

    return deleted[0];
};

export const updateStudentPartial = (id , data) => {
    const student = students.find(s => s.id === id);
    if (!students) return null;

    Object.assign(student, data);

    return student;
}

export const replaceStudent = (id, data) => {
    const index = students.findIndex(s=> s.id === id);

    if (index === -1) return null;

    students[index] = { id, ...data };

    return students[index];
}