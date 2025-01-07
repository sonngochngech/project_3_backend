import express from 'express';
import * as appCtrl from './controllers/appCtrl';
import * as notiCtrl from './controllers/notiCtrl';
const router = express.Router();


router.post('/trip/create',appCtrl.createTrip);
router.post('/trips',appCtrl.getTrip);
router.get('/cities',appCtrl.getCities);
router.get('/cities/supported',appCtrl.getSupportedCities);
router.post('/users/create',appCtrl.createUser);
router.delete('/trip/:id',appCtrl.deleteTrip);
router.put('/trip/:id/active',appCtrl.activeTrip);
router.post('/trip/:id/assessment',appCtrl.assessmentTrip);


// notifications
router.post('/notifications',notiCtrl.getNotifications);
router.delete('/notifications/:id',notiCtrl.deleteNotification);
router.post('/notifications/delete',notiCtrl.deleteAll);

export default router;