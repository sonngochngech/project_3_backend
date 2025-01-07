
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const key = process.env.OPENAI_API_KEY;
const openaiClient = new OpenAI({ apiKey: key });

export { openaiClient };