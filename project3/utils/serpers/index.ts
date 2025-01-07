import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const contentData=(name:string)=>{
    return JSON.stringify({
        "q": name,
        "gl": "vn"
      });
}
const config=(name:string)=>{
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://google.serper.dev/places',
        headers: { 
          'X-API-KEY': process.env.SERPER_API_KEY, 
          'Content-Type': 'application/json'
        },
        data : contentData(name)
      };
}

export async function makeRequest(name:string) {
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
        
    }catch (error) {
        console.error(error);
        return null;
    }
}