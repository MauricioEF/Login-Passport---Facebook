import mongoose from 'mongoose';

const collection = 'Users';

const UserSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    username:String,
    email:String,
    password:String,
    age:Number,
    address:String
})

export const users =  mongoose.model(collection,UserSchema);