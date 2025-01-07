import mongoose, { Document, Schema } from "mongoose";

export interface UserAnalizationDoc extends Document{
    deviceId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
const userAnalizationSchema: Schema= new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    content: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
export const UserAnalization=mongoose.model<UserAnalizationDoc>('UserAnalization', userAnalizationSchema);
