import { Request, Response } from "express";
import * as cityService from "../services/city";
import * as userService from "../services/user";
import * as tripService from "../services/trip";
import { TripDto, UserDto } from "../types";
import { sendRes } from "../common/responses";
import { TripReqDTO } from '../types/index';


export const  createTrip=async (req:Request,res:Response)=>{
        try{
            const body : TripReqDTO =req.body;
            const payload: TripDto={
                name: body.name,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                departureCode: body.departureCode,
                destinationCode: body.destinationCode,
                startTime: body.startTime,
                endTime: body.endTime,
                userPreferences: body.userPreferences,
                budget: body.budget
            }
            const data= await tripService.getTripDetails(payload);

            const departure=await cityService.getCity(payload.departureCode);
            const destination=await cityService.getCity(payload.destinationCode);
            const user=await userService.getUserByDeviceId(body.deviceId);
            const information={
                name: payload.name,
                startDate: payload.startDate,
                endDate: payload.endDate,
                startTime: payload.startTime,
                endTime: payload.endTime,
                departure: {
                    code: departure?.code,
                    name: departure?.name
                },
                destination: {
                    code: destination?.code,
                    name: destination?.name
                },
                userPreferences: payload.userPreferences,
                budget: payload.budget
            }
          

            const itinerary={
                itinerary: data,
                information: information,
                deviceId: user?._id,
                deviceRealId: user?.deviceId
            }
            const storedItinerary=await tripService.saveTrip(itinerary);

        return sendRes(res,null,storedItinerary);

        }catch(error){
            console.error(error);
            sendRes(res,error);
        }

}
export const getTrip=async (req:Request,res:Response)=>{
    try{
        const {deviceId}=req.body;
        const user: any=await userService.getUserByDeviceId(deviceId);
        const trip = await tripService.getTrip(user._id);
        sendRes(res,null,trip);
    }catch(error){
        console.error(error);
        sendRes(res,error);
    }
}
export const getCities=async (req:Request,res:Response)=>{
    try{
        const  cities=await cityService.getCities();
        sendRes(res,null,cities);

    }catch(error){
        console.error(error);
        sendRes(res,error)
    }

}

export const deleteTrip=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        if(!id) throw new Error("Trip id not found");
        const trip=await tripService.deleteTrip(id);
        sendRes(res,null,trip);
    }catch(error){
        console.error(error);
        sendRes(res,error);
    }
}

export const getSupportedCities=async  (req:Request,res:Response)=>{
    try{
        const  cities=await cityService.getSupportedCities();
        res.json({
            status:200,
            data:cities
        })

    }catch(error){
        console.error(error);
        sendRes(res,error)
    }
}
export const createUser=async (req:Request,res:Response)=>{
    try{
        let  data: UserDto=req.body;
        const user=await userService.createUser(data);

        if(!user) throw new Error("User not found");
        sendRes(res,null,user);
    }catch(error){
        console.error(error);
        sendRes(res,error);
    }
    
    
   
 
}

export const getUser=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        if(!id) throw new Error("User id not found");

        const user=await userService.getUser(id);
        if(!user) throw new Error("User not found");
        sendRes(res,null,user)
    }catch(error: unknown){
        console.error(error);
        sendRes(res,error)
    }
}

export const activeTrip=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const {value}=req.query;
        if(!id || !value) throw new Error("Trip id not found");
        const trip=await tripService.activeTrip(id,parseInt(value as string));
        sendRes(res,null,trip);
    }catch(error){
        console.error(error);
        sendRes(res,error);
    }
}

export const assessmentTrip=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        
        if(!id) throw new Error("Trip id not found");
        const {score,comment}=req.body;
        const trip=await tripService.assessmentTrip(id,score,comment);
        sendRes(res,null,trip);
    }catch(error){
        console.error(error);
        sendRes(res,error);
    }
}

