import mongoose, { Document, Schema } from "mongoose";

interface TripAnalizationDoc extends Document{
    itineraryId: string;
    popular: number;
    quality: number;
    userPreferenceMatch: number;
    score: number;
    createdAt: Date;
}

const tripAnalizationSchema: Schema = new mongoose.Schema({
    itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    popular: { type: Number, required: true },
    quality: { type: Number, required: true },
    userPreferenceMatch: { type: Number, required: true },
    score: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
    
});

export const TripAnalization=mongoose.model<TripAnalizationDoc>('TripAnalization', tripAnalizationSchema);