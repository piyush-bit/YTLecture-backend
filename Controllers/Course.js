import mongoose from "mongoose";
import CourseData from "../Models/CourseData.js";
import CourseDetail from '../Models/CourseDetail.js'
import Language from "../Models/Language.js";
import Tags from "../Models/Tags.js";
import Users from "../Models/Users.js";
import { createError } from "../error.js";

//create courses using json data 
export const create = async (req, res, next) => {
    const { data, ...details } = req.body;
    const creater = req.user || '6536ad741a3cb9f856657ca7';

    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create CourseData entry within the session
        const courseData = await CourseData.create([{ data }], { session });
        const { _id } = courseData[0];

        // Create CourseDetail entry within the session
        const courseDetail = await CourseDetail.create([{ ...details, creater, data: _id }], { session });

        // Commit the transaction if both operations succeed
        await session.commitTransaction();
        session.endSession();

        console.log(courseDetail);
        res.status(200).json(courseDetail);
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();

        // Pass the error to the next middleware
        next(error);
    }
}

//get course details along with data 
export const getCourseWithData = async (req, res , next)=>{
    try {
        const id =req.params.id;
        const data = await CourseDetail.findById(id).populate('data').populate('tags').populate('language');
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json("not found")
    }

}

// get only course detail
export const getCourse = async (req, res , next)=>{
    const id =req.params.id;
    const data = await CourseDetail.findById(id);
    res.status(200).json(data)

}


// get tags detail 
export const getTags = async (req, res , next)=>{
    try {
        const data = await Tags.find()
        res.json(data)
    } catch (error) {
        res.status(500)
    }
}

// get tags detail 
export const getLanguages = async (req, res , next)=>{
    try {
        const data = await Language.find()
        res.json(data)
    } catch (error) {
        res.status(500)
    }
}

// get all the course that are subscribed 
export const getSubscribedCourses = async (req, res , next)=>{
    try {
        if(!req.user)
        {
            res.status(401).json(401, "Not authenticated");
            next();
        }
        const user = await Users.findById(req.user?.id).populate("subscribedCourses")
        res.status(200).json(200,user.subscribedCourses)
    } catch (error) {
        res.status(500)
    }
}

export const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        // Check if courseId is provided
        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        // Find and delete the course by its ID
        const deletedCourse = await CourseDetailModel.findByIdAndDelete(courseId);

        // Check if the course exists
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
}

export const getCoursesWithTags = async (req, res, next) => {
    try {
        const { tagId } = req.query;

        // Check if tagId is provided
        if (!tagId) {
            //populate tags and language 
            const result = await CourseDetail.find({}).populate("language").populate("tags")
            return res.json(result)
        }

        // Find the tag by its ID and populate the courses field
        const tag = await Tags.findById(tagId).populate('courses').exec();

        // Check if the tag exists
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        return res.status(200).json( tag.courses );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
       
};

export const getCoursewithPlaylistId = async (req, res, next) => {

    try {
        const { playlistId } = req.query;
        console.log(playlistId);
        // Check if playlistId is provided
        if (!playlistId) {
            return res.status(400).json({ error: 'Playlist ID is required' });
        }

        // Find the course by its playlist ID
        const course = await CourseDetail.findOne({ playlistId : playlistId });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ course });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
}

export const searchCourses = async (req, res, next) => {


    try {
        const { searchKey } = req.query;
        console.log("search",searchKey);

        // Check if searchKey is provided
        if (!searchKey) {
            return res.status(400).json({ error: 'Search key is required' });
        }

        // Perform case-insensitive search on relevant fields
        const courses = await CourseDetail.find({
            $or: [
                { title: { $regex: new RegExp(searchKey, 'i') } },
                { description: { $regex: new RegExp(searchKey, 'i') } },
                // Add more fields if needed for searching
            ]
        }).exec();

        return res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};





