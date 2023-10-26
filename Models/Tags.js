import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
   title : { type : String , required : true} ,
   courses : [String],
   number : Number
    
});

export default mongoose.model("tag", TagSchema);
