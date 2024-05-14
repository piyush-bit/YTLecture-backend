import mongoose from "mongoose";

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
    //type object
    completedLectures: {
        type: Map, // Using Map to store key-value pairs
        of: Boolean, // Each value in the map is a boolean
        default: {}, // Default value is an empty object
    },
});
export default mongoose.model("Progress", ProgressSchema);

