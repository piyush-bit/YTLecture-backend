import express from "express";
const router = express.Router();
import CourseData from "../Models/CourseData.js";
import { getCourseWithData, getCoursesWithTags, getSubscribedCourses, searchCourses } from "../Controllers/Course.js";
import { verifyToken } from "../verifyTocken.js";

router.get('/:id',getCourseWithData)
router.get('/subs',verifyToken,getSubscribedCourses)
router.get('/subscribedCourses',verifyToken,getSubscribedCourses)



export default router;