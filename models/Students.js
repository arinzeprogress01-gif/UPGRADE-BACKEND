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

    course: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
        unique : true
    },

}, {
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;