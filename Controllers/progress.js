import CourseProgress from "../Models/CourseProgress.js";

export const checkLecture = async (req, res, next) => {


    const { courseId, lectureId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the Progress document exists for the given user and course
        let progress = await CourseProgress.findOne({ user: userId, course: courseId });

        // If progress doesn't exist, create a new document
        if (!progress) {
            progress = new CourseProgress({
                user: userId,
                course: courseId,
                completedLectures: {}
            });
        }

        // Update the completedLectures object with the new lecture status
        progress.completedLectures.set(lectureId, true);

        // Save the updated progress
        await progress.save();

        res.status(200).json({ success: true, message: "Progress updated successfully"  , data : progress.completedLectures});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update progress" });
    }
}

export const unCheckLecture = async (req, res, next) => {

    const { courseId, lectureId } = req.body;
    const userId = req.user.id;
    try {
        // Find the Progress document for the given user and course
        let progress = await CourseProgress.findOne({ user: userId, course: courseId });

        // If progress doesn't exist, return an error
        if (!progress) {
            return res.status(404).json({ success: false, message: "Progress not found for the given user and course" });
        }

        // Check if the lecture has been marked as completed
        if (progress.completedLectures.has(lectureId)) {
            // If lecture is completed, uncheck it
            progress.completedLectures.delete(lectureId);
            await progress.save();
            return res.status(200).json({ success: true, message: "Lecture unchecked successfully" , data : progress.completedLectures});
        } else {
            // If lecture is not completed, return a message indicating it's not checked
            return res.status(400).json({ success: false, message: "Lecture is not checked" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to uncheck lecture" });
    }
}

export const getProgressForCoursesAndUser = async (req, res, next) => {
    const  { courseId } = req.query;
    const userId = req.user.id;

    try {
        const progress = await CourseProgress.findOne({user : userId , course : courseId});
        if(!progress){
            return res.status(404).json({success : false , message : "progress not found"})
        }
        res.status(200).json({success : true , data : progress})
    } catch (error) {
        
    }
}
