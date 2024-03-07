import mongoose from "mongoose";

const Schema = mongoose.Schema({
    firstName:{ type: String , trim:true , required:true },
    lastName:{ type: String , trim:true , required:true },
    userName:{ type: String , trim:true  },
    email:{type:String , trim: true , required:true ,uniqe:true },
    password:{type:String, required:true , min:5 },
    recoveryMail:{type:String , trim: true ,uniqe:true },
    DOB:{type:Date , required:true},
    mobileNumber:{type:String , required:true , uniqe:true},
    role:{type:String,enum:["User" ,"Company_HR"], default:"User"},
    status:{type:String , enum:["online", 'offline'], default:"offline"},
    otp:{type:String, length:7,}

},{timestamps:true})







export const userModel= mongoose.model('user', Schema)