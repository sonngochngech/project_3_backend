const { default: OpenAI } = require("openai");
const {z}=require('zod');
const { zodResponseFormat } =require('openai/helpers/zod')
const axios = require('axios');
const provinces=require('./provinces.json');
const fs=require('fs');
require('dotenv').config();
const OPEN_AI_TOKEN =process.env.OPEN_AI_TOKEN;
const openai = new OpenAI({
    apiKey: OPEN_AI_TOKEN, 
    dangerouslyAllowBrowser: true
});

const modelName = "gpt-4o-2024-08-06";

const places= z.array(z.string());

const placesResponse=z.object({
    places:places
});

const createCompletion=async(prompt)=>{
    try{
        const response=await openai.chat.completions.create({
            model: modelName,
            messages: [{role: 'system', content: 'You are a helpful assistant.'}, {role: 'user', content: prompt}],
            response_format: zodResponseFormat(placesResponse,'places_response')
        });
        return response.choices[0].message;
    }catch(error){
        console.error(error);
    }
}

const contentData=(name)=>{
    return JSON.stringify({
        "q": name,
        "gl": "vn"
      });
}
const config=(name)=>{
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://google.serper.dev/places',
        headers: { 
          'X-API-KEY': '9ba73cd5197b0fe2950bd90da58f20e9a7fa0dbb', 
          'Content-Type': 'application/json'
        },
        data : contentData(name)
      };
}


async function makeRequest(name) {
try {
    const response = await axios.request(config(name));
    const newData = response.data.places && response.data.places[0];
        
        if (!newData) {
            // Handle the case when places[0] is not available
            console.log('No data available for the requested place');
            return null;
        }

        // Proceed if position exists
        if (newData.position) {
            const { position, ...updatedObj } = newData;
            return updatedObj;
        }

        return newData;
    
}
catch (error) {
    console.log(error);
}
}

const getPrompt=(name)=>{
    return `Give me top 15 travel places in ${name},viet nam?`
}

async function getDetails(name){
    const prompt=getPrompt(name);
    const response=await createCompletion(prompt);
    const places=JSON.parse(response.content).places;
    const placesDetails=await Promise.all(places.map(place=>makeRequest(place)));;
    return placesDetails;
}


async function updatePlaceData() {
    try {
        // Read the existing data from the JSON file
        let data = JSON.parse(fs.readFileSync('placeData.json', 'utf-8'));

        // Await the result of getDetails
        const placeDetail = await getDetails("Hà Giang");

        // Update the data object with the place details
        data["22"] = placeDetail;

        // Write the updated data back to the JSON file
        fs.writeFileSync('placeData.json', JSON.stringify(data, null, 2), 'utf-8');

        console.log('Place data updated successfully!');
    } catch (error) {
        console.error('Error updating place data:', error);
    }
}

// Call the function to update the place data
updatePlaceData();