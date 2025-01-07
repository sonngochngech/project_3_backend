import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const DB = process.env.MONGO_DB || 'mongodb://';
const USER = process.env.MONGO_DB_USER || '';
const PASSWORD = encodeURIComponent(process.env.MONGO_DB_PASSWORD || '');
const DB_NAME = process.env.MONGO_DB_NAME || '';
const HOST = process.env.MONGO_DB_HOST || 'localhost';

const dbUrl = `${DB}${USER}:${PASSWORD}@${HOST}/${DB_NAME}`;
console.log(dbUrl);




const  connectDB=async()=>{
    try{
        mongoose.set('strictQuery', false);
        const mongoDbConnection = await mongoose.connect(dbUrl, {
            retryReads: true,
            retryWrites: true
        });
    }catch(error: any){
        console.log(error);
    }
}
export {connectDB}