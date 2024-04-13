import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
   title : { type : String , required : true} ,
   courses :[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_detail",
    }]
});

export default mongoose.model("tag", TagSchema);
