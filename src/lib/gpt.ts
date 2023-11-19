import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export const getGPT3Response = async (messages, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const content = chatCompletion.choices[0].message.content.trim();
    res.write(content);
    res.end();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);    // e.g. 'invalid_api_key'
      console.error(error.type);    // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
    res.status(500).json({ error: "An error occurred during your request." });
  }
};
