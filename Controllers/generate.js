import generate, { generateSimple } from "../utils/Fetch/FetchDetail.js";

// generate using openai
export const generatePlaylist = async (req, res , next)=>{
    try {
        console.log(req.body.id);
          // Set headers for JSON and chunked response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
        
        try {
          const result = await generate(req.body.id , res)
          if(!result){
            res.end()
            return;
          }
          res.write(JSON.stringify({final:true ,message:"Playlist Generated" , result:result}))
          res.end()
        } catch (error) {
          res.write(JSON.stringify({message:error.message+"this one is error"}))
          res.end()
          console.log(error.message);
        }
    next();
    } catch (error) {
        res.status(501).json(error);
        res.end()
        console.log(error);
    }
    
  }
//generate only using youtube api 
  export const generatePlaylistNoAI = async (req, res , next)=>{
    try {
      console.log(req.body.id);
        // Set headers for JSON and chunked response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
        try {
          res.write(JSON.stringify({message:"Generating Playlist" , step:1})+ "\n---END---\n")
          const result = await generateSimple(req.body.id )
          if(!result){
            res.end()
            return;
          }
          res.write(JSON.stringify({final:true ,message:"Playlist Generated" , result:result}))
          res.end()
        } catch (error) {
          res.write(JSON.stringify({message:error.message+"this one is error"}))
          res.end()
          console.log(error.message);
        }
    next();
    } catch (error) {
        res.status(501).json({message : error.message})
        res.end()
    }
    
  }

  