import CourseData from "../Models/CourseData.js";
import CourseDetail from '../Models/CourseDetail.js'
import { createError } from "../error.js";

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
export const getCourseWithData = async (req, res , next)=>{
    const id =req.params.id;
    const data = await CourseDetail.findById(id).populate('data');
    res.json(data)

}

export const getCourse = async (req, res , next)=>{
    const id =req.params.id;
    const data = await CourseDetail.findById(id);
    res.json(data)

}


