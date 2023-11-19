import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getGPT3Response = async (messages, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Assuming the response from the API has the same structure as the JSON you provided
    const content = completion.data.choices[0].message.content.trim();
    
    res.write(content); // Stream the content back to the client
    res.end(); // End the response

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred during your request." });
  }
};
