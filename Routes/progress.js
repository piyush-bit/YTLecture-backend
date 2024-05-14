import express from "express";
import { checkLecture, getProgressForCoursesAndUser, unCheckLecture } from "../Controllers/progress.js";
import { verifyToken } from "../verifyTocken.js";
const router = express.Router();
router.get('/getprogress',verifyToken,getProgressForCoursesAndUser)
router.post('/checklecture',verifyToken,checkLecture)
router.post('/unchecklecture',verifyToken,unCheckLecture)

export default router;