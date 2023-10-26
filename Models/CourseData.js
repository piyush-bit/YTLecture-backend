import mongoose from "mongoose"

const courseDataSchema = new mongoose.Schema({
    _id : { type : String, required : true},
    Playlist_link : {type : String },
    Playlist_img : {type : String},
    title: { type: String, required: true }, 
    data : [
        {
            title : String ,
            content : [
                {
                    title : String,
                    description : String,
                    embed_link : String,
                    duration : String
                }
            ]
        }

    ]

})

export default mongoose.model("course-data",courseDataSchema)