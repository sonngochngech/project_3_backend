

import mongoose, { Document, Schema } from "mongoose";

export interface LuckyCompletionDoc extends Document{
    deviceId: string;
    content:[
        {
            role: string;
            content: string;
        }
    ]
}

const luckyCompletionSchema: Schema= new mongoose.Schema({
    deviceId:{type: String, required: true},
    content:[
        {
            role: {type: String, required: true},
            content: {type: String, required: true}
        }
    ]
})

export const LuckyCompletion=mongoose.model<LuckyCompletionDoc>('LuckyCompletion', luckyCompletionSchema);