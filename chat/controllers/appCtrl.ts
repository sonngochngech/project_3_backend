import { Request, Response } from "express";
import * as validateService from '../types/validate'
import { ASSITANT_ROLE, GPT_DELAY_TIME, GPT_HISTORY_LENGTH, GPT_RETRIES, ResponseSignal, USER_ROLE } from "../config/constants";
import * as chatService from '../services/chat'
import { chatCompletion } from "../utils/gpt/gpt";
import { ChatCompletionAssistantMessageParam } from "openai/resources";



export const intializeChat=async(req:Request,res:Response)=>{
    
    try{
        const {error,value}=validateService.verifySchema.validate(req.body);
        if(error){
            res.status(200).json({
                code: ResponseSignal.LACK_OF_DEVICE_ID.code,
                message: ResponseSignal.LACK_OF_DEVICE_ID.message,
            })
            return;
        }
        const {deviceId}:{deviceId: string} = req.body;
        console.log(deviceId);
        const conversation=await chatService.intializeChat(deviceId);

        if(!conversation){
            res.status(200).json({
                code: ResponseSignal.NOT_EXIST_PHONE_NUMBER.code,
                message: ResponseSignal.NOT_EXIST_PHONE_NUMBER.message,
             })
            return;
        } else{
            res.status(200).json({
                code:ResponseSignal.VERIFY_SUCCESSFULLY.code,
                message:ResponseSignal.VERIFY_SUCCESSFULLY.message,
                data: conversation,
            });
            return;
        }
    }catch(error){
        res.status(400).json({
            message: 'Hiện tại không thể khởi tạo cuộc trò chuyện, bạn vui lòng thử lại sau!',
        });

    }


    
}

export const chat=async(req:Request,res:Response)=>{
    try{
        console.log('chat');
        console.log(req.body);
        const {error,value}=validateService.chatSchema.validate(req.body);
        if(error){
            res.status(200).json({
                code: ResponseSignal.LACK_OF_CREDENTIALS.code,
                message: error.message,
            })
            return;
        }
        const {id,text}:{id: string,text: string}=req.body;

        const conversation=await chatService.chat(id,text,USER_ROLE);
        if(conversation===null){
            res.status(200).json({
                code: ResponseSignal.NOT_EXIST_CONVERSATION.code,
                message: ResponseSignal.NOT_EXIST_CONVERSATION.message,
            })
            return;
        }

        let messages: ChatCompletionAssistantMessageParam[]=conversation.content.map((message)=>{
            return {
                role: message.role,
                content: message.content
            }
        }) as ChatCompletionAssistantMessageParam[];
        let firstTwo=messages.slice(0,2);
        let remaining= messages.slice(2);
        let lastElements=remaining && remaining.length<10 ? remaining : remaining.slice(GPT_HISTORY_LENGTH);

        messages=[...firstTwo,...lastElements];
    // get response from GPT

        let gptRes: string|null ='';
        let attempt=1;
        while(attempt<GPT_RETRIES){
            try{
                gptRes=await chatCompletion(messages,null);
                break;
            }catch(error){

                console.error('Error generating answer:',error);
                attempt++;
                delay(GPT_DELAY_TIME);
                if(attempt>=GPT_RETRIES){
                    throw error;
                }
            }
        }

       
        //save to database 
       await chatService.chat(id,gptRes ||'',ASSITANT_ROLE);

        // return response
        res.status(200).json({
            code:ResponseSignal.GET_CHAT_MESSAGE_SUCCESSFULLY.code,
            message:ResponseSignal.GET_CHAT_MESSAGE_SUCCESSFULLY.message,
            data: gptRes,
        });
    }
    catch(error){
        res.status(400).json({
            message: 'Hiện tại không thể trò chuyện, bạn vui lòng thử lại sau!',
        });
    }
}

const delay=(ms: number)=>new Promise(resolve=>setTimeout(resolve,ms));
