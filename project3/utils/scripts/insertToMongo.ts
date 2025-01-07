import { City, CityDoc } from "../../models/schemas/city";
import { formattedProvinces } from '../../config/data/provinces';
import { connect } from "http2";
import { connectDB } from "../../config/mongodb";

async function insertToCity(){
    const cities: CityDoc[] = [];
     formattedProvinces.forEach((province) => {
        cities.push({
            code: parseInt(province.code),
            name: province.name,
            isSupported:  province.isSupported,
        } as CityDoc);
    });

    await City.insertMany(cities);

}

// async function insertToMongo(){
//     await connectDB();
//     await insertToCity();
// }
// insertToMongo().then(()=>{
//     console.log("Data inserted");
//     process.exit(0);
// }).catch((error)=>{
//     console.log(error);
//     process.exit(1);
// });