const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course_detail", // Reference to the Course model
        required: true,
    },
    completedLectures: [
        {
            type: String,
        },
    ],
});

const Progress = mongoose.model("Progress", ProgressSchema);

module.exports = Progress;
