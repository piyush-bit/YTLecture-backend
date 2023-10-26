import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    courses:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'course_detail' }
    ],

    subscribedCourses: [
        {
           type: mongoose.Schema.Types.ObjectId, ref: 'course_detail' },
    ],
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);