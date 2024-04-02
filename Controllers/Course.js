import CourseData from "../Models/CourseData.js";
import CourseDetail from '../Models/CourseDetail.js'
import Tags from "../Models/Tags.js";
import Users from "../Models/Users.js";
import { createError } from "../error.js";

//create courses using json data 
export const create = async (req, res , next)=>{
    const {data , ...details }=req.body;
    const creater = req.user || '6536ad741a3cb9f856657ca7';
    // console.log("data", data)
    // console.log("details",details);
    const {_id}  = await CourseData.create({ data});
    const {b} = await CourseDetail.create({...details ,creater , data : _id});
    

    console.log(b);
    res.send("ok")

}

//get course details along with data 
export const getCourseWithData = async (req, res , next)=>{
    try {
        const id =req.params.id;
        const data = await CourseDetail.findById(id).populate('data');
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(404,"not found")
    }

}

// get only course detail
export const getCourse = async (req, res , next)=>{
    const id =req.params.id;
    const data = await CourseDetail.findById(id);
    res.json(data)

}


// get tags detail 
export const getTags = async (req, res , next)=>{
    try {
        const data = await Tags.find().sort({ number: -1 }) // Sorting in descending order based on the 'number' field
        .limit(10);
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





