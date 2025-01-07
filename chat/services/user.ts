import { connectDB } from "../config/mongodb";
import { User } from "../models/schemas/user";
import { UserAnalization, UserAnalizationDoc } from "../models/schemas/userAnalization";

// export const getUserByPhoneNumber=async(phoneNumber:string)=>{

//     try{
//         const user=await User.findOne({
//             phoneNumber: phoneNumber
//         }).sort({ createdAt: -1 }).exec();
//         if(!user) return null;
//         return user;

//     }catch(error){
//         console.error('Error getting user by phone number:',error);
//         throw error;
    
//     }

// }

export const  getUserAnalizationByDeviceId=async(deviceId:string): Promise<UserAnalizationDoc|null>=>{
    try{
        console.log('deviceId:',deviceId);
        const device=await User.findOne({deviceId: deviceId}).exec();
        if(!device) return null;
        const user=await UserAnalization.findOne({
            deviceId: device?._id
        }).sort({ createdAt: -1 }).exec();
        if(!user) return null;
        return user;
    }catch(error){
        console.error('Error getting user by phone number:',error);
        throw error;
    }

}
// const insertData=async()=>{
//     try{
//         const contentAla=`Dành cho bạn, là người mệnh Mộc, khuyết Hỏa. Mang nguồn năng lượng từ yếu tố Mộc, bạn là người có tính cách trung hậu, cân đối các mối quan hệ rất tốt, có trách nhiệm và sẵn sàng chia sẻ, bám sát quá trình để đạt được kết quả. Bạn cũng là người có khả năng tự lực, tự cường với khả năng quản lý nhân sự tốt. Tuy nhiên, việc thiếu đi yếu tố Hỏa khiến cho bạn thiếu năng lượng nhiệt huyết, ít niềm vui. Điều này có thể dẫn đến sự thiếu động lực trong các hoạt động cần đòi hỏi sự quyết đoán và nhiệt huyết cao độ.

// Trong năm Ất Tỵ 2025, bạn tuổi Mùi sẽ gặp vận hạn liên quan đến mối quan hệ cá nhân và sự kiên định trong các quyết định. Bạn cần chú trọng hơn đến việc duy trì năng lượng tích cực và sự nhiệt huyết vì bạn có thể sẽ gặp phải trắc trở trong các kế hoạch cá nhân.

// Để bổ sung cho trường năng lượng năng động từ Hỏa đang khuyết thiếu trong bạn, hãy đi du lịch tới những nơi có đặc điểm khí hậu ấm áp, rực rỡ sắc màu. Tới nơi có nguồn năng lượng từ Hỏa dồi dào trong dịp Tết sẽ giúp bạn tiếp thêm động lực và sự nhiệt huyết cần thiết cho cuộc sống.`
//         const user={
//             phoneNumber: '123456789',
//             content: 'This is a test content'
//         };
//         const userAlalization={
//             phoneNumber: '123456789',
//             content:contentAla
//         };
//         await User.create(user);
//         await LuckAnalization.create(userAlalization);
//         console.log('Data inserted successfully');

//     }catch(error){
//         console.error('Error inserting data:',error);
//         throw error;
//     }

// }
// async function main(){
//     await connectDB();
//     await insertData();


// }
// main();