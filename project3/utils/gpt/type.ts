import { z, ZodLazy } from "zod";

export const LocationResponse = z.object({
    name: z.string(),
    duration: z.number(),
    price: z.number(),
    type: z.string(),
    terms: z.array(z.string())
});  
export const PlacesResponse = z.object({
    places: z.array(LocationResponse),
});
export const TermResponse=z.object({
    terms:z.array(z.string())
})

const itineraryActivity = z.object({
    type: z.string(),
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    price: z.number(),
});


export const TripPlanningResponse=z.object({
    itinerary: z.array(
        z.object({
            day: z.number(),
            realDay: z.string(),
            activities: z.array(itineraryActivity)
        })
    ),
})

export const canGo=z.object({
    canGo: z.boolean()
})

export const TripAssessment=z.object({
    popular: z.number(),
    quality: z.number(),
    userPreferenceMatch: z.number(),
})

export const TripAssessmentResponse=z.object({
    scores: z.array(TripAssessment)
});

export const UserProfileResponse=z.object({
    contents: z.array(z.string())
})