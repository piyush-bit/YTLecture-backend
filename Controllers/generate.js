import generate, { generateSimple } from "../utils/Fetch/FetchDetail.js";

// generate using openai
export const generatePlaylist = async (req, res , next)=>{
    try {
        console.log(req.body.id);
        const result = await generate(req.body.id)
        res.status(200).json(result);
    next();
    } catch (error) {
        res.status(501)
    }
    
  }
//generate only using youtube api 
  export const generatePlaylistNoAI = async (req, res , next)=>{
    try {
      console.log(req.body.id);
        const result = await generateSimple(req.body.id)
        res.status(200).json(result);
    next();
    } catch (error) {
        res.status(501)
    }
    
  }

  