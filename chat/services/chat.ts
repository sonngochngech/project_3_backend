import { ASSITANT_MESSAGE, USER_ROLE, SYSTEM_ROLE, USER_FIRST_MESSAGE, USER_REMINED_MESSAGE } from '../config/constants';
import { LuckyCompletion } from '../models/schemas/luckyCompletion';

import { getUserAnalizationByDeviceId } from "./user";


export const intializeChat=async(deviceId: string)=>{
    try{
        console.log(deviceId);
        console.log('intializeChat');
        const user=await getUserAnalizationByDeviceId(deviceId);
        let content=null;
        if(user){
             content=user?.content;
        }

        const systemMessage={
            role: SYSTEM_ROLE,
            content: ASSITANT_MESSAGE
        };
        const userMessage={
            role: USER_ROLE,
            content: content? `${USER_FIRST_MESSAGE} \n ${content}. \n ${USER_REMINED_MESSAGE} `:'Rất vui được gặp bạn'
        }

        const luckyCompletion={
            deviceId: deviceId,
            content:[systemMessage,userMessage]
        }

        const conversation = await LuckyCompletion.create(luckyCompletion);

        return conversation;
    }catch(error){
        console.error('Error initializing chat:',error);
        return null;
    }   
}

export const chat=async(id: string,text: string,role: string)=>{
    try{
        const conversation=await LuckyCompletion.findById(id);
        if(!conversation){
            return null;
        }
        const userMessage={
            role: role,
            content: text
        }
        conversation.content.push(userMessage);
        await conversation.save();
        return conversation;
    }catch(error){
        console.error('Error chatting:',error);
        return null;
    }
}
