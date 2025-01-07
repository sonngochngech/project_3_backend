import { posix } from "path";
import { z } from "zod";

const itineraryActivity = z.object({
    position: z.number(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    endTime: z.string()
});

const city= z.object({
    code: z.string(),
    name: z.string(),
    reason: z.array(z.object({
        criteria: z.string(),
        description: z.string()
    })),
});

export const CityResponse = z.object({
    comment: z.string(),
    introduction: z.string(),
    desiredCity: city,
    suggestedCity: z.array(city)
});
export const AcommodationResponse = z.array(z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
}));
export const LocationDescriptionsResponse = z.array(z.object({
    position: z.number(),
    name: z.string(),
    description: z.string(),
    address: z.string()
}));
export const FoodDescriptionsResponse = z.array(z.object({
    position: z.number(),
    name: z.string(),
    restaurantName: z.string(),
    description: z.string(),
    address: z.string(),
}));
export const ItineraryResponse = z.object({
    itinerary: z.array(
        z.object({
            day: z.number(),
            realDay: z.string(),
            activities: z.array(itineraryActivity)
        })
    ),
    totalFee: z.object({
        travelExperience: z.number(),
        transportation: z.number(),
        accommodation: z.number(),
        food: z.number(),
        other: z.number(),
    }),
    foods: FoodDescriptionsResponse,
    locations: LocationDescriptionsResponse,
    accommodation: AcommodationResponse,
    tips: z.array(z.object({
        name: z.string(),
        description: z.string()
    })),
    weather: z.object({
        name: z.string(),
        description: z.string(),
        temperature: z.number()
    })
});

export const MinPriceResponse=z.object({
    canGo: z.boolean(),
    price: z.number()
});