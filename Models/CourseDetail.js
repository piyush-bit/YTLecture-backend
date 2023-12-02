import mongoose from "mongoose";

const courseDetailSchema = new mongoose.Schema({
  playlistId: { type: String, required: true },
  playlistLink: { type: String },
  playlist_img: { type: String, required: true },
  views: { type: String },
  updatedDate: { type: String },
  channelName: { type: String },
  channelId: { type: String },
  title: { type: String },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  }],
  language : { type : String , required : true},
  review: { type:Number , default: 5},
  review_number:{ type:Number , default: 0},
  language: String,
  creater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: { type: String, required: true },
  description: String,
  enrollmentCount: { type: Number, default: 0 },
  data : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course-data",
  }
});

export default mongoose.model("course_detail", courseDetailSchema);
