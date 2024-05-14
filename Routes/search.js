import express from "express";
import { addLanguage, addTag, createTag, languageSearch, removeTag, tagSearch } from "../Controllers/search.js";

const router = express.Router();
router.get('/tag',tagSearch)
router.get('/language',languageSearch)
router.put('/addtag', addTag)
router.put('/addlanguage', addLanguage)
router.put('/removetag', removeTag)
router.put('/createtag', createTag)
export default router;