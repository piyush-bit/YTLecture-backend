import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
   title : { type : String , required : true} ,
   number : Number
});

export default mongoose.model("tag", TagSchema);
