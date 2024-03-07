import mongoose, { Types } from "mongoose";



const Schema= mongoose.Schema({
    jobTitle:{type:String, required:true , trim:true},
    jobLocation:{type:String, required:true , trim:true},
    workingTime:{type:String, required:true , trim:true},
    seniorityLevel:{type:String,enum:["Junior","Mid-Level","Senior","Team-Lead"," CTO"]},
    jobDescription:{type:String , required:true ,trim:true},
    technicalSkills:[{type:String}],
    softSkills:[{type:String}],
    createdBy:{type:Types.ObjectId , ref:"user"},
    company:{type:Types.ObjectId , ref:"company"},
    
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true} , strictQuery:true })



Schema.query.paginate = function (page) {
    page = page <1 || isNaN(page) || !page ? 1:page
    const limit = 1
    const skip = limit * (page-1)
    return this.skip(skip).limit(limit)}



Schema.query.search= function(keyword){
    if(keyword){
        return this.find({name:{$regex :keyword , $options:"i"}})
    }
    return this

}

export const jobModel= mongoose.model("job", Schema)