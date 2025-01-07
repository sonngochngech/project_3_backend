
import {chromaClient} from '../../config/chroma';
import { BASE_DOCUMENT_CHAT_KEY } from '../../config/constants';
import { openaiClient } from '../../config/gpt';
import * as dotenv from 'dotenv';
dotenv.config();
const EMBEDDING_MODEL = 'text-embedding-3-small';

const createTextVector = async (text: string): Promise<number[]> => {
    try {
        const res = await openaiClient.embeddings.create({
            model: EMBEDDING_MODEL,
            input: text
        });
        const vector: number[] = res.data[0].embedding;
        return vector;
    } catch (error) {
        console.error('Error creating text vector:', error);
        throw error;
    }
}

export const intializeBaseDocument=async(texts: string[])=>{
    try {
        const params={
            name: 'documentss',
        } as any;
        let collection;
        try{
              collection = await chromaClient.getCollection(params);

        }catch(e){
            collection=await chromaClient.createCollection(params);
        }

        const vectorList=await Promise.all(texts.map(async (text:string,index:number) => {
            return  await createTextVector(text);
        }));

        await collection.add({
            ids: texts.map((text, index) => index.toString()),
            documents: texts,
            embeddings: vectorList
        })
    
    } catch (error) {
        console.error('Error adding text to Chroma:', error);
        throw error;
    }
}

const queryDocument=async(text:string,collectionNames:string[])=>{
    try{
        const embedding=await createTextVector(text);
     
        let result: any[]=[];
        const res=await Promise.all(collectionNames.map(async (name:string)=>{
            let res=await getSimilarText(embedding,name,1);
            return res;
        }));
        result.push(...res);
        return result;
        

    }catch(error){
        console.error('Error querying document:',error);
        throw error;
    }
}

const getSimilarText=async (embedding: number[],name: string,resultQuantity:number)=>{
    try{
        let params={
            name: name
        } as any;

        let collection=await chromaClient.getCollection(params);
        if(!collection) return null;
        const result=await collection.query({
            queryEmbeddings: embedding,
            nResults: resultQuantity
        })
        return result.ids;

    }catch(e){
        throw e;
    }

}


// async function main(){
//     await intializeBaseDocument(BASE_DOCUMENT_CHAT_KEY);
//     const resList: any[]=[];
//      const results= await Promise.all(RELATED_QUESTIONS.map(async (question:string)=>{
//         const res=await queryDocument(question,['documentss']);
//         console.log('Related question:',question);
//         return res;
//     }));
//     resList.push(...results);
    
// }
// main();