export const validateStudent = (req, res, next) => {
    const { name, class: studentClass, payment } = req.body;

    if (!name || !studentClass || typeof payment !== "boolean") {
        return res.status(400).json({
            error: "Invalid student data"
        });
    }

    next();
};

export const validateGetStudentId = (re, res, next) => {
   
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
}

export const validateDeleteStudent = (re, res, next) => {

    if (!deleted) {
        return res.status(404).json({ error: "Student not found" });
    }

}

export const validatePatchStudent = (re, res, next) => {

    if (!updated) {
        return res.status(404).json({ error: "Student not found" });
    }

}

export const validatePutStudent = (re, res, next) => {

    if (!replaced) {
        return res.status(404).json({ error: "Student not found" });
    }

}




