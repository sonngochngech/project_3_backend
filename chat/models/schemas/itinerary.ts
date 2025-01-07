import mongoose, { Document, Schema } from "mongoose";

export interface ItineraryDoc extends Document{
    itinerary:[
        {
        day: number;
        realDay: string;
        activities: {
            type: string;
            name: string;
            description: string;
            startTime: string;
            endTime: string;
            price: number;
        }[]
        }
    ],
    deviceId: string;
    active: boolean;
    score: number;
    comment: string;
    information:{
        name: string;
        startDate: Date;
        endDate: Date;
        startTime: number;
        endTime: number;
        departure: {
            code: number;
            name: string;
        }
        destination:{
            code: number;
            name: string;
        };
        userPreferences: string[];
        budget: number;
    };
    isAssessed: boolean;
    createdAt: Date;
    updatedAt: Date;

}

const itinerarySchema: Schema = new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    itinerary: [
        {
            day: { type: Number, required: true },
            realDay: { type: String, required: true },
            activities: [
                {
                    type: { type: String, required: true },
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    startTime: { type: String, required: true },
                    endTime: { type: String, required: true },
                    price: { type: Number, required: true }
                }
            ]
        }
    ],
    active: { type: Boolean, required: true ,default:false},
    score: { type: Number,require: false },
    comment: { type: String, required: false },
    information: {
        name: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        startTime: { type: Number, required: true },
        endTime: { type: Number, required: true },
        departure: {
            code: { type: Number, required: true },
            name: { type: String, required: true }
        },
        destination: {
            code: { type: Number, required: true },
            name: { type: String, required: true }
        },
        userPreferences: { type: [String], required: true },
        budget: { type: Number, required: true },
       
    },
    isAssessed: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Itinerary=mongoose.model<ItineraryDoc>('Itinerary', itinerarySchema);