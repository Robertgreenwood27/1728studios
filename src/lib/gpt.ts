import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getGPT3Response = async (messages, initialPrompt, res) => {
  try {
    const fullPrompt = `${initialPrompt}\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: fullPrompt,
        max_tokens: 256,
    });

    if (completion.choices && completion.choices.length > 0) {
      const content = completion.choices[0].text.trim();
      res.write(content);
    }

    res.end();
    
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    } else {
      console.error(error);
      res.status(500).json({ error: "An error occurred during your request." });
    }
  }
};
