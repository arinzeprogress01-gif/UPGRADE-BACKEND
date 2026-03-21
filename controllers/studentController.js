import loggerUtils from '../utils/loggerUtils.js';
import Student from "../models/Students.js"
import {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudentPartial,
    replaceStudent
} from "../services/studentService.js";




export const getStudents = async (req, res) => {
    try{
        
        let students;
        
        if (req.user.role === "admin"){ students = await getAllStudents();

        loggerUtils.info("All students retrieved successfully");
        }
        else { 
            loggerUtils.error("YOU DO NOT ACCESS ADMIN ACCESS")
            return res.status(404).json({ error: "UNAUTHORIZED ACCESS"});
        }

        return res.status(200).json(students);
    }catch(error){
        loggerUtils.error("Error occurred while fetching students");
        return res.status(500).json({ error: "Internal Server Error. Failed to fetch students" });
    }
};




export const getStudent = async (req, res) => {
   
    try{
        
        const student = await Student.findById(req.studentId);

        if (!student) {
            loggerUtils.error(`Error: Invalid student id - ${req.params.id}`);
            return res.status(404).json({
                error : "Id Does not Exist"
            });
        }

        if (
            req.user.role !== "admin" && student.user.toString() !== req.user.id
        ) {
            loggerUtils.error("NOT AUTHORIZED TO ACCESS STUDENT DATA")
            return res.status(403).json({
                error: "Not Authorized to access this student"
            });
        }

        loggerUtils.info(`Student with ID ${req.studentId} retrieved successfully`);

        return res.status(200).json(student);

    }catch(error){

        loggerUtils.error("Error occurred while fetching student");
        return res.status(500).json({ error: "Internal Server Error. Failed to retrieve student" });
    }

};




export const addStudent = async (req, res) => {

    try{
        const newStudent = await createStudent({
            name: req.body.name,
            class: req.body.class,
            course: req.body.course,
            gender: req.body.gender,
            age: req.body.age,
            user: req.user.id
        });
        loggerUtils.info(`Student with ID ${newStudent.id} created successfully`);

        return res.status(201).json(newStudent);

    } catch (error) {
        
        if (error.code === 11000) {


            loggerUtils.error("Student already has a profile ");
            return res.status(500).json({ error: "YOU ALREADY HAVE A STUDENT PROFILE" });
        }
        loggerUtils.error("ERROR IN LOGGED STUDENT DATA")
        return res.status(404).json({error: "FAILED TO CREATE STUDENT"})
    }
};




export const removeStudent = async (req, res) => {

    try{
        
        const deleted = await deleteStudent(req.studentId);

        if (!deleted) {
            loggerUtils.error(`Error: Invalid student id - ${req.params.id}`);
            return res.status(404).json({
                error : "Id Does not Exist"
            });
        }

        if (
            req.user.role !== "admin" &&
            deleted.user.toString() !== req.user.id
            ) {
                loggerUtils.error("NOT AUTHORIZED TO DELETE")
                return res.status(403).json({
                error: "Not authorized to delete"
            });
        }



        loggerUtils.info(`Student with ID ${req.studentId} deleted successfully`);

        return res.status(200).json({ message: "Student deleted" });

    }catch(error){
        loggerUtils.error("Error occurred while deleting student");
        return res.status(500).json({ error: "Internal Server Error. Failed to delete student" });
    }
    
};



export const patchStudent = async (req, res) => {
    
    try{
        const updated = await updateStudentPartial(req.studentId, req.body);

        if (!updated) {
            loggerUtils.error(`Error: Invalid student id - ${req.params.id}`);
            return res.status(404).json({
                error : "Id Does not Exist"
            });
        }

        if (
            req.user.role !== "admin" &&
            updated.user.toString() !== req.user.id
            ) {
                loggerUtils.error("NOT AUTHORIZED TO UPDATE")
                return res.status(403).json({
                error: "Not authorized to update"
            });
        }


        loggerUtils.info(`Student with ID ${req.studentId} updated successfully`);
        return res.status(200).json(updated);
    } catch (error) {
        loggerUtils.error("Error occurred while updating student");
        return res.status(500).json({ error: "Internal Server Error. Failed to update student" });
    }
    
};




export const putStudent = async (req, res) => {

    try{
        const replaced = await replaceStudent(req.studentId, {
        name: req.body.name,
        class: req.body.class,
        course: req.body.course,
        gender: req.body.gender,
        age: req.body.age
    });

        if (!replaced) {
            loggerUtils.error(`Error: Invalid student id - ${req.params.id}`);
            return res.status(404).json({
                error : "Id Does not Exist"
            });
        }

        if (
            req.user.role !== "admin" &&
            replaced.user.toString() !== req.user.id
        ) {
            loggerUtils.error("NOT AUTHORIZED TO UPDATE")
            return res.status(403).json({
                error: "Not authorized to update"
            });
        }

        loggerUtils.info(`Student with ID ${req.studentId} replaced successfully`);
        return res.status(200).json(replaced);

    } catch (error) {
        loggerUtils.error("Error occurred while replacing student");
        return res.status(500).json({ error: "Internal Server Error. Failed to replace student" });
    }    
};

