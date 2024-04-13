import express from "express";
const router = express.Router();
import CourseDetail from "../Models/CourseDetail.js";
import { get } from "mongoose";
import { getCoursesWithTags, getTags, searchCourses } from "../Controllers/Course.js";
router.get('/',async(req,res)=>{

  req.query.tags
    const result = await CourseDetail.find({})
    res.json(result)
  })
  router.get('/id',getTags)
  // router.get('/',getCoursesWithTags)
  router.get('/search',searchCourses)


export default router ;