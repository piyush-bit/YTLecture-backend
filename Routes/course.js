import express from "express";
const router = express.Router();
import CourseData from "../Models/CourseData.js";

router.get('/:playlistId',async(req,res)=>{
    const id=req.params.playlistId
    const result =await CourseData.findById(id)
  
    res.json(result)
})

export default router;