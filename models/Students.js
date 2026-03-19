import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    class: {
        type: String,
        required: true
    },

    payment: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;