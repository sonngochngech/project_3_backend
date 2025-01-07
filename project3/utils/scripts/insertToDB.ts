import { locations } from "../../config/data/location";
import { locationDetails } from "../../config/data/locationDetails";
import { provinces } from "../../config/data/provinces";
import { prisma } from "../../config/prisma";
import { TermResponse } from '../gpt/type';
async function insertCity(){
    let newProvince = provinces.map((province) => {
        return {
            id: Number(province["code"]), // Convert id to number
            name: province["name"],
            supported: true
        };
    });

    const city = await prisma.cities.createMany({
        data: newProvince
    });

}

async function insertLocations() {
    let storedLocation: any[]=[];
    locationDetails.map((location, number) => {
         location.map((place: any) => {
            let item= {
                latitude: place?.latitude|| null,
                longitude: place?.longitude ||null,
                rating: place?.rating|| null,
                city_id: Number(provinces[number]["code"]),
                rating_count: place?.ratingCount|| null,
                address: place?.address|| null,
                category: place?.category|| null,
                cid: place?.cid||null,
                phone_number: place?.phoneNumber|| null ,
                title: place?.title|| null ,
                website:  null,
            };
            storedLocation.push(item);
            return item;
        });
    });
    storedLocation=storedLocation.map((location,index)=>{
        return {id: index+1,...location};
    });
    const locations = await prisma.locations.createMany({
        data: storedLocation
    });

    console.log("Locations inserted:", locations);
}

async function insertActivity(){
    let storedActivity: any[]=[];
    let termActivity: any[]=[];
    locations.map((location)=>{
         location.places.map((place)=>{
            storedActivity.push(place);
        });
    });
    storedActivity=storedActivity.map((activity:any,index:number)=>{
        activity.terms.map((term:string)=>{
            if(term==="MORNING"){
               termActivity.push({
                activity_id: index+1,
                term_id: 1
               })
            }else if(term==="AFTERNOON"){
                termActivity.push({
                    activity_id: index+1,
                    term_id: 2
                   })
            }
            else if(term==="EVENING"){
                termActivity.push({
                    activity_id: index+1,
                    term_id: 3
                   })
            }
        });
        return {
            id: index+1,
            location_id: index+1,
            duration: activity.duration,
            price: activity.price,
            name: activity.name,
            type: activity.type,
        }
    })
    const activity = await prisma.activities.createMany({
        data: storedActivity
    });
    const termActivityInsert = await prisma.activity_terms.createMany({
        data: termActivity
    });

}

// async function main(){
    // await insertCity();
    // await insertLocations();
    // await insertActivity();
    // console.log("Done");
    // process.exit(0);
// }
// main();