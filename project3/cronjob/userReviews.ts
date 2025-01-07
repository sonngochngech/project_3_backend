import { zodResponseFormat } from "openai/helpers/zod";
import { Itinerary } from "../models/schemas/itinerary";
import { User } from "../models/schemas/user"
import { UserAnalization, UserAnalizationDoc } from '../models/schemas/userAnalization';

import { UserProfileResponse } from "../utils/gpt/type";
import { formatedResCompletion } from "../utils/gpt/completion";


const userReviews=async()=>{
    const devices=await User.find({}).exec();
    let userInformation=await Promise.all(devices.map(async (device: any)=>{
                const itineraries=await Itinerary.find({
                    deviceId: device._id,
                    score: { $ne: null },
                    comment: { $ne: null },
                    updatedAt: { $gte: new Date(new Date().setDate(new Date().getDate()-7)) }
                }).exec();
                console.log("zo");
                console.log(itineraries);
                if(itineraries.length===0 || !itineraries) {
                    console.log("zo1");
                    return null;
                }
                
                const newContent=itineraries.map((item)=>{
                    return  `The trio content: ${JSON.stringify(item.itinerary)} \n The score: ${item.score} \n The comment: ${item.comment}`;
                }).join('\n');

                    
                const userAnalization : UserAnalizationDoc|null= await UserAnalization.findOne({deviceId: device._id}).exec();
                let content='';
                if(userAnalization){
                    content=userAnalization.content;
                }
                let prompt='';
                if(content.length===0){
                    prompt=`The new user information is: ${newContent}`;
                }else{
                    prompt=` The previous user overall description is: ${content} \n The new user information is: ${newContent}`;
                }
                
                return {
                    id: device._id,
                    prompt: prompt
                }          
        }))
    userInformation=userInformation.filter((item)=>item!==null);
    console.log(userInformation.length);
    console.log("User information generated successfully.");

    let prompt=userInformation.map((item,index)=>{
        return `User ${index+1}:\n ${item}`
    }).join('\n');

    prompt=prompt+`\n.Pleasse based on the previous overall information and the new assessment of user about the new trip, give the overall user's favorite description for each user based on the coressponding previous analization and the new user assessment (only use  user not specifc user name in respond) and the response is format: 
    contents:[]`;

    const  analResponse=zodResponseFormat(UserProfileResponse,"userProfileResponse");
    const response =await formatedResCompletion(null,prompt,analResponse);
    if(!response?.parsed)  throw new Error("Error in response");
    const result=response.parsed as any;
    console.log(result);
    console.log("User analization generated successfully.");

    await Promise.all(result.contents.map(async (item: any,index:number)=>{
        if(!userInformation[index]) return;
        const userAnalization: UserAnalizationDoc|null= await UserAnalization.findOne({deviceId: userInformation[index].id}).exec();
        if(userAnalization){
            userAnalization.content=item;
            await userAnalization.save();
        }else{
            const newUserAnalization= new UserAnalization({
                deviceId: devices[index]._id,
                content: item
            });
            await newUserAnalization.save();
        }
    }));
    console.log("User analization updated successfully.");

}

export {userReviews};