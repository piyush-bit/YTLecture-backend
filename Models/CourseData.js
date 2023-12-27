import mongoose from "mongoose"

const courseDataSchema = new mongoose.Schema({
    data : [
        {
            subtopic : String ,
            duration : String,
            data : [
                {
                    title : String,
                    description : String,
                    embedLink : String,
                    duration : String ,
                    img : String
                }
            ]
        }

    ]

})

export default mongoose.model("course-data",courseDataSchema)