import express from "express";
const router = express.Router();
import { generatePlaylist, generatePlaylistNoAI } from "../Controllers/generate.js";
router.post('/playlist',generatePlaylist)
router.post('/playlistnoai',generatePlaylistNoAI)

export default router;