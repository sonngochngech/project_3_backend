import request from 'supertest';
import express from 'express';
import {app} from '../index';
import { RELATED_QUESTIONS, UNRELATED_QUESTIONS } from '../config/constants';

// describe('Test the root path', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(app).get('/');
//         expect(response.status).toBe(404);
//     });
// });

// describe('Test the /verifyPhoneNumber path', () => {
//     test('It should response the POST method', async () => {
//         const response = await request(app).post('/verifyPhoneNumber');
//         expect(response.status).toBe(200);
//     });
// });

// describe('Test the /intializeChat path', () => {
//     test('It should response the POST method', async () => {
//         const response = await request(app).post('/api/v1/chat/initialize')
//                                 .send({phoneNumber: '123456789'});
                                
//         expect(response.status).toBe(200);
//         console.log(response.body);

//     });
// });

describe('Test the /chat path', function() {
    jest.setTimeout(5000000);
    test('It should response the POST method', async () => {
        for(let i of RELATED_QUESTIONS){
            const response = await request(app).post('/api/v1/chat/ask')
                                                .send({id: '675813164e399e20a669cf5c', text: i})
            ;
            expect(response.status).toBe(200);
            console.log(response.body);
           
        }
        for(let j of UNRELATED_QUESTIONS){
            const response = await request(app).post('/api/v1/chat/ask')
                                                .send({id: '675813164e399e20a669cf5c', text: j})
            ;
            expect(response.status).toBe(200);
            console.log(response.body);
        }
   
    });
});

const delay=(ms: number)=>new Promise(resolve=>setTimeout(resolve,ms));
