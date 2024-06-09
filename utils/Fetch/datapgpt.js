// import { OpenAI } from "openai";

// async function subCatogrise(data) {
//   const openai = new OpenAI({
//     apiKey: "",
//   });

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content:
//           'you are a course designer\ndivide the following topic in subtopics \n      give data in format (json)\n      important : title string in both input and output string should be exactly same \n      \ninput format \n[\n{\n"title":"<Title>"\n},\n.......\n]\n\noutput format \n      [\n      subtopic : String ,\n      data : [ title : String ]\n      ]',
//       },
//       {
//         role: "user",
//         content: JSON.stringify(data),
//       },
//     ],
//     temperature: 1,
//     max_tokens: 4096,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });

//   console.log(response);
//   return JSON.parse(response.choices[0].message.content);
// }

// export default subCatogrise;

import { GoogleGenerativeAI } from "@google/generative-ai";
const subCatogrise = async (data) => {
  const genAI = new GoogleGenerativeAI(
    process.env.OPENAI_API
  );
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${data} \n divide the following topic in subtopics give data in format (json) \n important : title string in both input and output string should be exactly same \n outputformat \n [ {subtopic : String , data : [ {title : String} ... ]}.... ] \n only change the sequence of videos if the given sequence is not correct and its absolute necessary to change the sequence of videos `;
  console.log(prompt);

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 8192 ,
    },
  });

  const result = await chat.sendMessage(prompt);
  console.log("Recieved")
  const response = await result.response;
  const text = response.text();
  console.log("*****************************************")
  console.log(text);
  console.log("*****************************************")

  // console.log(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1));
  console.log("Fetching Done");

  const jsonContent = JSON.parse(
    text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)
  );
  console.log("successfully fetched data",jsonContent);
  return jsonContent;
};

export default subCatogrise;
