import { User } from '../models/schemas/user';
import { UserDto } from "../types"
import { tryCatchWrapper } from '../utils/handleErrorWrapper';


export const createUser=tryCatchWrapper(async(user: UserDto)=>{
    const userExists=await User.findOne({deviceId: user.deviceId}).exec();
    if(userExists) return userExists;
    const newUser=new User(user);
    await newUser.save();
    return newUser;
});

export const getUser=tryCatchWrapper(async(id: string)=>{

    const user=await User.findById(id).exec();
    if(!user) throw new Error("User not found");
    return user;
    
});

export const getUserByDeviceId=tryCatchWrapper(async(deviceId: string)=>{
    const user=await User.findOne({ deviceId: deviceId}).exec();
    if(!user) throw new Error("User not found");
    return user;
});