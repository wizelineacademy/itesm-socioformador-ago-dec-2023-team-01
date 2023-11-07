// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration, OpenAIApi } from 'openai-edge';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';
const config = new Configuration({
  apiKey: process.env.PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'system', content: 'You are a helpful assistant expert in programming.' },
      ...messages,
    ],
  });

  const stream = await OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
