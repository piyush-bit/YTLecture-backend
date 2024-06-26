import CourseDetail from "../Models/CourseDetail.js";
import Language from "../Models/Language.js";
import Tags from "../Models/Tags.js";




export const createTag = async (req, res , next)=>{
    
    try {
        const { name } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Create a new tag instance
        const newTag = new Tags({ title: name });

        // Save the new tag to the database
        const createdTag = await newTag.save();

        return res.status(201).json({ message: 'Tag created successfully', tag: createdTag });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
}

export const createLanguage = async (req, res , next)=>{
    
    try {
        const { name } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Create a new tag instance
        const newLanguage = new Language({ title: name });

        // Save the new tag to the database
        const createdLanguage = await newLanguage.save();

        return res.status(201).json({ message: 'Tag created successfully', tag: createLanguage });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
}


export const tagSearch = async (req, res , next)=>{
    try {
        const search = req.query.s;
        const regex = new RegExp(search, 'i');
        
        const results = await Tags.find({ title: regex }).exec();
        
        console.log('Search Results:', results);
        res.json(results); // Send the results back to the client
    } catch (err) {
        console.error('Error:', err);
        next(err); // Forward the error to the error handling middleware
    }
    
}
export const languageSearch = async (req, res , next)=>{
    try {
        const search = req.query.s;
        const regex = new RegExp(search, 'i');
        
        const results = await Language.find({ title: regex }).exec();
        
        console.log('Search Results:', results);
        res.json(results); // Send the results back to the client
    } catch (err) {
        console.error('Error:', err);
        next(err); // Forward the error to the error handling middleware
    }
    
}

export const addTag = async (req, res, next) => {
    try {
        const { courseId, tagId } = req.body;

        // Check if both courseId and tagId are provided
        if (!courseId || !tagId) {
            return res.status(400).json({ error: 'Both courseId and tagId are required' });
        }

        // Find the course detail by its ID
        const course = await CourseDetail.findById(courseId);

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the tag exists
        const tag = await Tags.findById(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        // Check if the tag is already added to the course
        if (course.tags.includes(tagId)) {
            return res.status(400).json({ error: 'Tag is already added to the course' });
        }
        
        //if no tag exists 
        if(!course.tags){
            course.tags=[tagId];
        }
        else
        course.tags.push(tagId);

        if(!tag.courses){
            tag.courses=[courseId]
        }
        else
        tag.courses.push(courseId);

        // Save the updated course
        await course.save();
        await tag.save();

        return res.status(200).json({ message: 'Tag added successfully', course });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });
    }
};

export const addLanguage = async (req, res, next) => {
    try {
        const { courseId, languageId } = req.body;
        if(!courseId||!languageId){
            return res.status(400).json({ error: 'Both courseId and languageId are required' });
        }


        // Find the course detail by its ID
        const course = await CourseDetail.findById(courseId);

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the tag exists
        const language = await Language.findById(languageId);
        if (!language) {
            return res.status(404).json({ error: 'Language not found' });
        }
        
        //check if the language is already added to the course
        if (course.language ) {
            //search for the language that exists in the course and remove the course from the list
            const preLanguage = await Language.findById(course.language);
            if(preLanguage){const index = preLanguage.courses.indexOf(courseId);
            if (index > -1) {
                preLanguage.courses.splice(index, 1);
                await preLanguage.save();
            }}

            course.language = languageId;
            if(language.courses){
                language.courses.push(courseId)
            }
            else
            language.courses=[courseId]
        }
        else{
            course.language = languageId;
            if(language.courses){
                language.courses.push(courseId)
            }
            else
            language.courses=[courseId]
        }
        // Save the updated course
        await course.save();
        await language.save();

        res.status(200).json({ message: 'Language added successfully' });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error ${error}` });   
    }
}

export const removeTag = async (req, res, next) => {
    try {
        const { courseId, tagId } = req.body;

        // Check if both courseId and tagId are provided
        if (!courseId || !tagId) {
            return res.status(400).json({ error: 'Both courseId and tagId are required' });
        }

        // Find the course detail by its ID
        const course = await CourseDetail.findById(courseId);
        const tag = await Tags.findById(tagId);


        // Check if the course exists
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the tag exists in the course's tags array
        const index = course.tags.indexOf(tagId);
        if (index === -1) {
            return res.status(404).json({ error: 'Tag not found in the course' });
        }
        await course.save();

        course.tags.splice(index, 1);
        const index2= tag.courses.indexOf(courseId);


        if (index2 === -1) {
            return res.status(404).json({ error: 'course not found in the Tag' });
        }

        // Remove the tag from the course's tags array
        
        tag.courses.splice(index2, 1);

        // Save the updated course
        
        await tag.save();

        return res.status(200).json({ message: 'Tag removed successfully', course });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

