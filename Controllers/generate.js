import generate, { generateSimple } from "../utils/Fetch/FetchDetail.js";

export const generatePlaylist = async (req, res , next)=>{
    try {
        const result = await generate(req.  body.id)
        res.status(200).json(result);
    next();
    } catch (error) {
        res.status(501)
    }
    
  }

  export const generatePlaylistNoAI = async (req, res , next)=>{
    try {
        const result = await generateSimple(req.body.id)
        res.status(200).json(result);
    next();
    } catch (error) {
        res.status(501)
    }
    
  }