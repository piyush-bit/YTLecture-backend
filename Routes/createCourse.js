import express from "express";
const router = express.Router();
import {create} from '../Controllers/Course.js'
import { verifyToken } from "../verifyTocken.js"
import { createLanguage, createTag } from "../Controllers/search.js";
router.post('/',create)
router.post('/createtag',createTag)
router.post('/createlanguage',createLanguage)
export default router;