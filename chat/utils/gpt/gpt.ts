import * as dotenv from 'dotenv';
dotenv.config();
import {openaiClient} from "../../config/gpt";
import { ChatMessage, GPTConfig } from '../../types/types';
import { ChatCompletionAssistantMessageParam } from 'openai/resources';
const model =process.env.GPT_MODEL!;

export const formatedResCompletion = async (instruct: string = "You are a helpful assistant", message: string, format: any,config:GPTConfig |null) => {
    try {
        const res = await openaiClient.beta.chat.completions.parse({
            model: model,
            messages: [
                {
                    role: 'system', content: instruct
                },
                {
                    role: 'user', content: message
                }
            ],
            response_format: format
        });
        const answer = res.choices[0].message;
        return answer;
    } catch (error) {
        console.error('Error generating answer:', error);
        throw error;
    }
};

export const chatCompletion = async (messages: ChatCompletionAssistantMessageParam[]  ,config:GPTConfig |null) => {
    try {
        const res = await openaiClient.chat.completions.create({
            model: model,
            messages: messages,
        });
        console.log(res.choices[0]);
        const answer = res.choices[0].message.content;
        return answer;
    } catch (error) {
        console.error('Error generating answer:', error);
        throw error;
    }
};