import cron from 'node-cron';
import { tripAssessments, updateWeight } from './tripAssessments';
import { userReviews } from './userReviews';
import { createNotification } from '../services/notification';

export const runCon = async () => {
   
    cron.schedule('0 0 1 * *', () => {
        console.log('Running cron job on the 1st of every month');
        tripAssessments();
    });

    cron.schedule('0 0 1 * *', () => {
        console.log('Running cron job on the 15th of every month');
        userReviews();
       
    });
    cron.schedule('0 0 15 * *', () => {
        console.log('Running cron job on the 15th of every month');
        updateWeight();
    });

    // Run each day at 00:00
    cron.schedule('0 0 * * *', () => {
        console.log('Running daily cron job');
        createNotification();
      
    });
};
