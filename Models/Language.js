import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
   title : { type : String , required : true} ,
   number : Number
});

export default mongoose.model("language", LanguageSchema);
