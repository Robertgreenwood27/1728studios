import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getGPT4oMiniResponse = async (messages, res) => {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: messages,
      stream: true,
      max_tokens: 16384,
    });

    // Set up SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.log(error);
    }
    res.status(500).json({ error: "An error occurred during your request." });
  }
};