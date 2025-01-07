
import mongoose, { Document, Schema } from "mongoose";

export interface CityDoc  extends Document{
    name: string;
    code: number;
    isSupported: boolean;
    createdAt: Date;

}

const citySchema: Schema= new mongoose.Schema({
    name: {type: String, required: true,unique: true},
    code: {type: Number, required: true,unique: true},
    isSupported: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now }
})

export const City=mongoose.model<CityDoc>('City', citySchema);