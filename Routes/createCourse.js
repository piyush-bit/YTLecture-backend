import express from "express";
const router = express.Router();
import {create} from '../Controllers/Course.js'
router.post('/',create)

export default router;