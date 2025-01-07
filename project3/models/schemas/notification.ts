import mongoose, { Document, Schema } from "mongoose";

export interface NotificationDoc extends Document{
    title: string;
    message: string;
    externalData: string;
    deviceIds: string[];

}

const notificationSchema: Schema= new mongoose.Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    externalData: {type: String, required: false},
    deviceIds: [{type: String, required: true}]
})

export const Notification=mongoose.model<NotificationDoc>('Notification',notificationSchema);