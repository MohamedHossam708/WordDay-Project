import mongoose, { Types } from "mongoose";


const Schema =new mongoose.Schema({

    jobId:{type:Types.ObjectId, ref:"job"},
    userId:{type:Types.ObjectId, ref:"user"},
    userTechSkills:[{type:String}],
    userSoftSkills:[{type:String}],
    userResume:{
        id:{type:String},
        url:{type:String}
    }
},{timestamps:true})



export const applicationModel=mongoose.model("application", Schema)