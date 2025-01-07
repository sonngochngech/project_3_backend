import { zodResponseFormat } from "openai/helpers/zod";
import { Itinerary } from "../models/schemas/itinerary";
import { TripAssessmentResponse } from "../utils/gpt/type";
import { formatedResCompletion } from "../utils/gpt/completion";
import { TripAnalization } from '../models/schemas/tripAnalization';
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const tripAssessments = async () => {

  try{
    const itineraries = await Itinerary.find({
        isAssessed: false,
        comment: { $ne: null },
        score: { $ne: null },
    }).exec();


    await Promise.all(itineraries.map(async (item) => {
        item.isAssessed = true;
        await item.save();
    }));
    console.log("Itineraries updated successfully.");

    const newItinerary=itineraries.map((item)=>{
  
        const itinerary= {
            itinerary: item.itinerary,
            departure: item.information.departure,
            destination: item.information.destination,
            userPreferences: item.information.userPreferences,
        }
        const itineraryInString=item?.itinerary?.map((day)=>
        { 
            return `Day ${day?.day} ${day?.realDay} \n Activities:  ${day?.activities?.map((activity)=>
                                                                { 
                                                                    console.log("activity",activity);
                                                                    return `${activity?.name} ${activity?.description}`
                                                                }).join('\n')}
                                                        `
        }).join('\n');
        const prompt=`The trip is from ${itinerary.departure.name} to ${itinerary.destination.name} And below is the itinerary:
        ${itineraryInString}
        The user preferences are ${itinerary.userPreferences.join(', ')}
        Please give score of the itinerary from 1 to 10  on popular, quality and matching with user preferences according to the user preferences and the itinerary quality
        `
        return {
            id: item._id,
            prompt: prompt,
            score: item.score,
        }
    })
    let prompt= newItinerary.map((item:any,index: number)=>{
        return `The trip ${index+1}: \n ${item.prompt}`
    }).join('\n');
    prompt=prompt+`\n.Please give score of the itinerary from 1 to 10  on popular, quality and matching with user preferences according to the user preferences and the itinerary quality 
                   and format reponse is :
                   scores: [{popular: number, quality: number, userPreferenceMatch: number}]`


    let format=zodResponseFormat(TripAssessmentResponse,"tripAssessmentResponse");
  
    let response= await formatedResCompletion(null,prompt, format);

    if(!response?.parsed)  throw new Error("Error in response");
    console.log(response.parsed);
    const result=response.parsed as any;
    await Promise.all(result.scores.map(async (item: any,index:number)=>{
        const exitTripAnalization=await TripAnalization.findOne({itineraryId: newItinerary[index].id}).exec();
        if(!exitTripAnalization){
            let tripAnalization = new TripAnalization({
                itineraryId: newItinerary[index].id as string,
                popular: item.popular as number,
                quality: item.quality as number,
                userPreferenceMatch: item.userPreferenceMatch as number,
                score: newItinerary[index].score as number
            });
            await tripAnalization.save();
        }
    }));
    console.log("Trip assessment done");

    return;
  }catch(err){
      console.log(err);
  }

}



const updateWeight=async()=>{
    const tripAnalizations=await TripAnalization.find({
        popular: { $ne: null },
        quality: { $ne: null },
        userPreferenceMatch: { $ne: null },
        score: { $ne: null },
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
    }).exec();
    let optimizeData=tripAnalizations.map((item)=>{
        return [item.popular,item.quality,item.userPreferenceMatch,item.score];
    });
    const res= await axios.post(`${process.env.GATE_WAY_URL}${process.env.OPTIMIZER_ENDPOINT}`,{
        data: optimizeData
    });
    if(!res.data) throw new Error("Error in response");
    const [popular,quality,userPreferenceMatch]=res.data;
    const updateWeight=await axios.post(`${process.env.GATE_WAY_URL}${process.env.UPDATE_WEIGHT_ENDPOINT}`,{
        placePopularityWeight: popular,
        placeQualityWeight: quality,
        placePreferenceWeight: userPreferenceMatch
    });
    if(!updateWeight.data) throw new Error("Error in response");
    console.log("Weight updated successfully.");
}

// const addIsAssessed = async () => {
//     const itinerary = await Itinerary.find({
       
//     }).exec();

//     await Promise.all(itinerary.map(async (item) => {
//         item.isAssessed = false;
//         await item.save();
//     }));
// }

// const addScoreAndComment = async () => {
//     try {
//         const itinerary = await Itinerary.find({}).exec();
//         console.log(itinerary);

//         await Promise.all(itinerary.map(async (item) => {
//             try {
//                 item.score = Math.floor(Math.random() * 10) + 1;
//                 item.comment = "The trip is normal";
//                 await item.save();
//             } catch (err) {
//                 console.error(`Error updating itinerary with id ${item._id}:`, err);
//             }
//         }));

//         console.log("Scores and comments updated successfully.");
//     } catch (err) {
//         console.error("Error fetching itineraries:", err);
//     }
// }

export { tripAssessments,updateWeight };