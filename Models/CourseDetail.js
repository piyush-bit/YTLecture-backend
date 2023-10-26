import mongoose from "mongoose";

const courseDetailSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    PlaylistLink: { type: String }, 
    title: { type: String, required: true }, 
    tags: [String], 
    review: Number,
    review_numer : Number ,
    language : String,
    author: String, 
    duration: String, 
    description: String, 
    enrollmentCount: Number, 
    
});

export default mongoose.model("course_detail", courseDetailSchema);
