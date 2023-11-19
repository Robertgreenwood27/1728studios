//gpt.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getGPT3Response = async (messages, initialPrompt, res) => {
  try {
    const formattedMessages = messages.map(message => `${message.role}: ${message.content}`).join('\n');
    const fullPrompt = `${initialPrompt}\n${formattedMessages}`;  // Combine the initial prompt with the conversation
    
    // Start streaming response here
    const completion = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        max_tokens: 256,
    });

    for await (const message of completion) {
      if (message.data.choices && message.data.choices.length > 0) {
        const content = message.data.choices[0].message.content.trim();
        res.write(content); // Stream each piece of the message as it comes
      }
    }
    
    // End the response when the stream is complete
    res.end();
    
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    } else {
      console.error(error);  // log the error to see what went wrong
      res.status(500).json({ error: "An error occurred during your request." });
    }
  }
};
