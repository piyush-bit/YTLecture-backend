import Fuse from 'fuse.js';
function dataProcessor(content,structureData) {
  const contentData = content.data;

  // const contentMap = {};
  // contentData.forEach((item) => {
  //   contentMap[item.title] = item;
  // });

  // Create a Fuse instance for fuzzy string matching
  const fuse = new Fuse(contentData, { keys: ['title'], threshold: 0.3 });


  let totalDuration = 0;
  // Arrange the content based on the structure and calculate total duration for each subtopic
  const arrangedContent = structureData.map((topic) => {
    let subtopicDuration = 0;

    const newData = topic.data.map((item) => {
      const title = item.title;

      // Use fuzzy matching to find the most relevant content item
      const result = fuse.search(title)[0];

    //   if (contentMap.hasOwnProperty(title)) {
    //     const duration = contentMap[title].duration; // Default to zero if duration is not present
    //     subtopicDuration += parseDuration(duration);
    //     return { ...contentMap[title], duration };
    //   } else {
    //     console.log("Title not found:", title);
    //     throw new Error("AI generation failed try again")
    //   }
    // });

    if (result) {
      const duration = result.item.duration; // Default to zero if duration is not present
      subtopicDuration += parseDuration(duration);
      return { ...result.item, duration };
    } else {
      console.log("Title not found:", title);
      throw new Error("AI generation failed try again");
    }
  });
    totalDuration += subtopicDuration;  
    return {
      subtopic: topic.subtopic,
      duration: formatDuration(subtopicDuration),
      data: newData,
    };
  });

  const result = {
    ...content,
    duration: formatDuration(totalDuration),
    tags: [],
    language: [],
    data: arrangedContent,
  };
  return result;
}

// Function to parse ISO 8601 duration format to seconds
function parseDuration(duration) {
  const arr = duration.match(/\d+/g).map(Number);
  let sec = 0;
  let multiplier = 1;
  while (arr.length != 0) {
    sec = sec + arr.pop() * multiplier;
    multiplier *= 60;
  }
  return sec;
}

// Function to format seconds to ISO 8601 duration format
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  console.log(seconds + `PT${hours}H${minutes}M${remainingSeconds}S`);
  return `PT${hours}H${minutes}M${remainingSeconds}S`;
}


export default dataProcessor;