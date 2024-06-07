import generate, { generateSimple } from "../utils/Fetch/FetchDetail.js";

// generate using openai
export const generatePlaylist = async (req, res , next)=>{
    try {
        console.log(req.body.id);
        try {
          const result = await generate(req.body.id)
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({message : error.message});
          console.log(error.message);
        }
    next();
    } catch (error) {
        res.status(501).json(error);
        console.log(error);
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
        res.status(501).json({message : error.message})
    }
    
  }

  