import axios from "axios";
import { Itinerary, ItineraryDoc } from "../models/schemas/itinerary";
import { Notification } from "../models/schemas/notification";
import { tryCatchWrapper } from "../utils/handleErrorWrapper";
import * as dotenv from 'dotenv';
import { connectDB } from "../config/mongodb";
import { User } from "../models/schemas/user";
import { getUser } from '../controllers/appCtrl';
dotenv.config();

const getNotifications=tryCatchWrapper(async(deviceId:string)=>{
    const notis=await Notification.find({
        deviceIds: deviceId
    }).exec();
    return notis;


})

const deletedNotification=tryCatchWrapper(async(id: string)=>{
    const result = await Notification.findByIdAndDelete(id).exec();
    return result;
});

const deleteAll = tryCatchWrapper(async (deviceId: string) => {
    const result = await Notification.deleteMany({ deviceIds: deviceId }).exec();
    return result;
  });



 const createNotification=tryCatchWrapper(async()=>{
    const itineraries: ItineraryDoc[] | null = await Itinerary.find({
        active: true,
        $or: [
          { "information.startDate": { $gte: new Date() } },
          { "information.endDate": { $gte: new Date() } }
        ]
      }).exec();
    if(!itineraries) return;
    let notis: any[]=itineraries.map((item: ItineraryDoc) => {
        let title='';
        let message='';
        if (item.information.startDate> new Date() && item.information.startDate<new Date(new Date().setDate(new Date().getDate() + 2))) {
            title=`Du lịch cùng chúng tôi`;
            message=`Chuyến đi ${item.information.name} của bạn sắp bắt đầu hãy vào app để xem chi tiết`;
        }else if(item.information.endDate> new Date() && item.information.endDate< new Date(new Date().setDate(new Date().getDate() + 1))){
            title=`Du lịch cùng chúng tôi`;
            message=`Chuyến đi ${item.information.name} của bạn sắp kết thúc hãy vào app để xem chi tiết`;
        }else{
            return null;
        }
        const notification={
            title: title,
            message: message,
            devices: [item.deviceRealId],
            deviceIds: [item.deviceRealId]
        }
        console.log(notification);
        return notification;
    });
    notis=notis.filter((item)=>item!==null);
 
    await Promise.all(notis.map(async (item)=>{
        const newNotification=new Notification(item);
        await newNotification.save();
    }));
    notis=notis.map((item)=>{return {title: item.title, message: item.message, devices: item.devices}});
    await sendNotification(notis);
})


const sendNotification = tryCatchWrapper(async (notis: any) => {
    try{           
    await axios.post(
                    `${process.env.GATEWAY_URL}/${process.env.NOTI_ENDPOINT}`,
                    {notis: notis}
                );
    } catch (error) {
       throw new Error("Error in sending notification");
    } finally {
    }
});


async function main() {
    await connectDB();
    await createNotification();
    console.log("Notification sent successfully.");
}
main();

export {getNotifications,deletedNotification,deleteAll,createNotification};