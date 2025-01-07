import express from 'express';
import * as appCtrl from './controllers/appCtrl'
const router = express.Router();


router.post('/chat/ask',appCtrl.chat);
router.post('/chat/initialize',appCtrl.intializeChat);


export default router;