import { HttpStatusCode } from "axios";
import { Response } from "express";

export function sendRes(res:Response,err:Error|null|unknown,data:any={}): void{
    if(err instanceof Error){
        res.status(HttpStatusCode.BadRequest).send({message: err.message|| 'Hiện tại không thể phản hồi'});
    }else{
        res.status(HttpStatusCode.Ok).send(data);
    }
}