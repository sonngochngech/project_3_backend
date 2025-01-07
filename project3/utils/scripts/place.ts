import { zodResponseFormat } from "openai/helpers/zod";
import { provinces } from "../../config/data/provinces"
import { formatedResCompletion } from "../gpt/completion";
import {PlacesResponse,  TermResponse } from "../gpt/type";
import { locations } from "../../config/data/location";
import * as fs from 'fs';
import { makeRequest } from "../serpers";
const applyDate=async ()=>{
     const res= await Promise.all(provinces.map(async (province)=>{
        const prompt=`Hãy cho tôi biết về 30 các địa điểm nổi tiếng đẻ đi du lịch khám phá ở ${province["name"]},Việt Nam về giá tính theo việt nam đồng , thời gian dành cho hoạt động (thời gian chỉ ghi là 2 hoặc 4(tính theo giờ)),
        loại địa điểm( mỗi địa điểm thuộc một trong cá loại sau  Nature, History_Culture, Foodie, NightLife, Shopping, CAFFE]),term có thể là một hoặc nhiều trong MORNING,AFTERNOON,EVENING
        và kết quả trả về là 
        places: [{name: ,duration: ,price: ,type:,terms:[term1,term2,] }] 
        `
        const format=zodResponseFormat(PlacesResponse,"placeResponse");
        const res= await formatedResCompletion(undefined,prompt,format);
        return res.parsed;
    }));
    fs.writeFile('result.json', JSON.stringify(res, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been saved.');
        }
    });
    console.log("Done");

}
const getLocationDetail=async()=>{

    const res=await Promise.all(locations.map(async(location)=>{
        const subRes=await Promise.all(location.places.map(async(place)=>{
            const res= await makeRequest(place.name);
            return res; 

        }));
        return subRes;
    }))
    fs.writeFile('result.json', JSON.stringify(res, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been saved.');
        }
    });
    console.log("Done");

}

const addTerm=async()=>{
    let newLocations=JSON.parse(JSON.stringify(locations));
    const res=await Promise.all(newLocations.map(async(location:any)=>{
        const subRes=await Promise.all(location.places.map(async(place:any)=>{
            const prompt=` hãy cho tôi biết về term của ${place.name} ,term có thể là một hoặc nhiều trong MORNING,AFTERNOON,EVENING
            format trả về là : term:[term1,term2,...]
            `
            const format=zodResponseFormat(TermResponse,"termResponse");
            const res= await formatedResCompletion(undefined,prompt,format); 
            const termRes=res.parsed as any;
            place["terms"]=termRes?.terms;
            return termRes; 

        }));
        return subRes;
    }))
    fs.writeFile('result.json', JSON.stringify(newLocations, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been saved.');
        }
    });
    console.log("Done");

}
async function  main(){
    // await applyDate();
    // await getLocationDetail();
    await addTerm();
}
main();