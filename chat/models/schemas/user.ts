
import mongoose, { Document, Schema } from "mongoose";

export interface UserDoc extends Document{
    deviceId: string;
    deviceType: string;
    createdAt: Date;

}

const userSchema: Schema= new mongoose.Schema({
    deviceId: {type: String, required: true,unique: true},
    deviceType: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
})

export const User=mongoose.model<UserDoc>('User', userSchema);