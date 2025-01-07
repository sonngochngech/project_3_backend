export type TripDto={
    name: string, 
    startDate: Date,
    endDate: Date,
    startTime: number,
    endTime: number,
    departureCode: number,
    departureName?: string,
    destinationCode: number,
    destinationName?: string,
    userPreferences: string[],
    budget: number
}
export type UserDto={
    deviceId: string,
    deviceType: string,
    createdAt: Date|undefined|null
}

export type TripReqDTO={
    deviceId: string,
    name: string, 
    startDate: string,
    endDate: string,
    startTime: number,
    endTime: number,
    departureCode: number,
    destinationCode: number,
    userPreferences: string[],
    budget: number

}