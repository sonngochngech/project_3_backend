import { Request, Response } from "express";
import * as notificationService from "../services/notification";
import { sendRes } from "../common/responses";

const getNotifications=async (req:Request,res:Response)=>{
    try{
        const {deviceId}=req.body;
        if(!deviceId) throw new Error("Device id not found");
        const notis=await notificationService.getNotifications(deviceId);
        
        return sendRes(res,null,notis);
    }catch(error){
        console.error(error);
        return sendRes(res,error);
    }
}

const deleteNotification=async (req:Request,res:Response)=>{
    try{
        console.log("deleteNotification");
        const {id}=req.params;
        if(!id) throw new Error("Notification id not found");
        const deletedCount=await notificationService.deletedNotification(id);
        return sendRes(res,null,deletedCount);
    }catch(error){
        console.error(error);
        return sendRes(res,error);
    }
}
const deleteAll=async (req:Request,res:Response)=>{
    try{
        const {deviceId}=req.body;
        if(!deviceId) throw new Error("Device id not found");
        const deletedCount=await notificationService.deleteAll(deviceId);
        return sendRes(res,null,deletedCount);
    }catch(error){
        console.error(error);
        return sendRes(res,error);
    }
}

export {getNotifications,deleteNotification,deleteAll};