import axios, { Method } from "axios";

export const ResReq=async(type: string,url: string, data: any)=>{
    try {
        const response = await axios.request({
            method: type,
            maxBodyLength: Infinity,
            url: url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          });
          return response.data;
    }catch (error) {
        console.error(error);
        return null;
    }
}


