import  express  from "express";
import { verifyToken } from "../verifyTocken.js";
import { checkSubscription, deleteUser, subscribe, unsubscribe, update, user } from "../Controllers/user.js";
import { getCreatedCourses, getSubscribedCourses } from "../Controllers/Course.js";
const router = express.Router();


//self detail 
router.get("/",verifyToken,user)
//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//subscribe a user
router.put("/course/sub", verifyToken, subscribe);

//unsubscribe a user
router.put("/course/unsub", verifyToken, unsubscribe);

//get all the subscribed courses
router.get('/course/subscribedCourses',verifyToken,getSubscribedCourses)

//get all the created courses
router.get('/course/createdCourses',verifyToken,getCreatedCourses)

//check if user is subscribed to a course
router.get('/chceksubscription',verifyToken,checkSubscription)

export default router;