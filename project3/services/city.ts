import { City, CityDoc } from "../models/schemas/city"
import { tryCatchWrapper } from '../utils/handleErrorWrapper';


export const getCities=tryCatchWrapper(async()=>{
    const cities=await City.find().exec();

    return cities;
})

export const getSupportedCities=tryCatchWrapper(async()=>{
        const cities=await City.find({isSupported:true}).exec();
        return cities;
})

export const getCity = tryCatchWrapper(async (code: number): Promise<CityDoc> => {
    const city = await City.findOne({ code :code}).exec();
    if (!city) {
        throw new Error(`City with code ${code} not found`);
    }
    return city;
});