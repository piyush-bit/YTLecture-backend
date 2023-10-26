import express from "express";
const router = express.Router();
import CourseDetail from "../Models/CourseDetail.js";
router.get('/',async(req,res)=>{
    const result = await CourseDetail.find({})
    res.json(result)
  })

export default router ;