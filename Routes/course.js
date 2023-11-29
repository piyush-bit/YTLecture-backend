import express from "express";
const router = express.Router();
import CourseData from "../Models/CourseData.js";
import { getCourseWithData } from "../Controllers/Course.js";

router.get('/:id',getCourseWithData)

export default router;