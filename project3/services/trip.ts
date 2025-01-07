import { HttpStatusCode } from "axios";
import { reqType } from "../config/constants";
import { TripDto } from "../types";
import { ResReq } from "../utils/restReq";
import * as dotenv from 'dotenv';
import { tripPrompt } from "../utils/gpt/script";
import { formatedResCompletion } from "../utils/gpt/completion";
import { zodResponseFormat } from "openai/helpers/zod";
import { canGo, TripPlanningResponse } from "../utils/gpt/type";
import { tryCatchWrapper } from '../utils/handleErrorWrapper';
import { Itinerary } from "../models/schemas/itinerary";
import { getCity } from "./city";
import { start } from "repl";
import * as fs from 'fs';



dotenv.config();

export const getTripDetails= tryCatchWrapper(async( tripDto: TripDto)=>{

            let startPlace=await getCity(tripDto.departureCode);
            let endPlace=await getCity(tripDto.destinationCode);
            tripDto.destinationName=endPlace?.name;
            let canGoprompt=`The user want to has a trip from ${startPlace?.name} to  ${endPlace?.name} from ${tripDto.startDate.toDateString()} to ${tripDto.endDate.toDateString()} with the budget of ${tripDto.budget} . Whether he can go?
                    if he can go, please answer "canGo: true", otherwise, answer "canGo: false"`;
            let canGoFormat=zodResponseFormat(canGo,"canGo");
            console.log(canGoprompt);

            let canGoRes=await formatedResCompletion(null,canGoprompt,canGoFormat);
            if(!canGoRes?.parsed) throw new Error("Error in response");
            const canGoResult=canGoRes.parsed as any;
            console.log(canGoResult);
            if(!canGoResult.canGo) throw new Error("Bạn không thể đi với ngân sách này,hãy tăng ngân sách của bạn");

            const res= await ResReq(reqType.POST,`${process.env.GATEWAY_URL}/${process.env.ITINERARY_ENDPOINT}`,tripDto); 
           
            if(res===null) throw new Error("Bạn hãy thử lại sau nhé!");
        
            let activities: any=res.data.activities as any;
            fs.writeFile('result.txt', JSON.stringify(activities, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('File has been saved.');
                }
            });
            
        
            
            let prompt=convertToPrompt(tripDto,activities);

            fs.writeFile('prompt.txt', JSON.stringify(prompt, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('File has been saved.');
                }
            });

            let format=zodResponseFormat(TripPlanningResponse,"tripPlanningResponse");
  
            let response= await formatedResCompletion(null,prompt, format);

            if(!response?.parsed)  throw new Error("Error in response");
            console.log(response.parsed);
            const result=response.parsed as any;
            const itinerary=result.itinerary as any;
            itinerary.map((element:any)=>{
                console.log(element.activities);

            });
            return itinerary;
});

const convertToActivity=(activities: any)=>{
    activities.map((activity: any,index: any)=>{
        const result=`
        Activity ${index+1}:
        name: ${activity.name}, type : ${activity.type}, duration: ${activity.duration}, price: ${activity.price}
        `;
        return result;
    });
    return activities.join("\n");
}

const convertToPrompt=(tripDto: TripDto,activities: any)=>{
    const newAct=activities.map((activity: any,index: any)=>{
        return `
        Day ${index+1}:
        ${convertToActivity(activity)}
        `
    }).join("\n");


    const result=`
    Trip Name: ${tripDto.name}
    Start Date: ${tripDto.startDate.toDateString()}
    End Date: ${tripDto.endDate.toDateString()}
    Start Time: ${tripDto.startTime}
    End Time: ${tripDto.endTime}
    Destination name: ${tripDto.destinationName}
    User Preferences: ${tripDto.userPreferences}
    Budget: ${tripDto.budget}
    Activities: ${newAct}
    `;
    const prompt=`
    InputData:   ${result}
    (Activity is bonded with a location, the location is the popular location in the city)
    The user want to has a trip to ${tripDto?.destinationName} from ${tripDto.startDate.toDateString()} to ${tripDto.endDate.toDateString()} with the budget of ${tripDto.budget} .
    The data is an information about a trip. The trip has a name, start date, end date, start time, end time, departure city, destination city, user preferences, budget and activities. The activities is a draft of the user's itinerary which need to be improved .
    if the activity has "RELAXE_IN_CAFE" name, please reseach to find a new location which is fit with the user's preferences and budget and data.
    Moreover, each day in a trip must  have a  location list from morning to evening. The activity list have to be in order of time.(Location should be the popular location in the city)
    and answer following the format:
    itinerary: [ {   day: ,  realDay: , activities:[{name: ,type: , description: , startTime: , endTime:,price: }]}]
    Explain day is the order of day, and realDay is a the real day of the trip. 
    You have to give an itinerary for each day
        Please all content in the response should be in vietnamese,
    `
    console.log(prompt);
    return prompt;

}

export const saveTrip=tryCatchWrapper(async(itinerary: any)=>{
    const trip=new Itinerary(itinerary);
    const newItinerary = await trip.save();
    return newItinerary;    
});

export const deleteTrip = tryCatchWrapper(async (id: string) => {
    const trip = await Itinerary.findByIdAndDelete(id).exec();
    if (!trip) {
        throw new Error(`Trip with id ${id} not found`);
    }
    return trip;
});
export const getTrip=tryCatchWrapper(async(deviceId: string)=>{
    const trip=await Itinerary.find({deviceId: deviceId}).exec();
    return trip;
});

export const activeTrip=tryCatchWrapper(async(id: string,value: number)=>{
    const trip=await Itinerary.findById(id).exec();
    if(!trip) throw new Error(`Trip with id ${id} not found`);
    if(value===1) trip.active=true;
    else trip.active=false;
    const newTrip=await trip.save();
    return newTrip;
});

export const assessmentTrip=tryCatchWrapper(async(id: string,score: number,comment: string)=>{
    const trip=await Itinerary.findById(id).exec();
    if(!trip) throw new Error(`Trip with id ${id} not found`);
    trip.score=score;
    trip.comment=comment;
    const newTrip=await trip.save();
    return newTrip;
});


// async function main(){
//     const exampleTrip: TripDto = {
//         name: "Summer Vacation",
//         startDate: new Date('2023-06-15'),
//         endDate: new Date('2023-06-30'),
//         startTime: 8,
//         endTime: 20,
//         departureCode: 14,
//         destinationCode: 38 ,
//         userPreferences: ["Nature", "History_Culture"],
//         budget: 15000000
//     };
//     await getTripDetails(exampleTrip);
// }

// main();