
import mongoose, { Types } from "mongoose";


const Schema = mongoose.Schema({
    companyName:{type:String , uniqe:true , trim:true , required:true},
    description :{type:String  , trim:true ,  required:true},
    industry :{type:String  , trim:true ,  required:true},
    address :{type:String  , trim:true ,  required:true},
    numberOfEmployess:{type:Object , min:{type:Number}, max:{type:Number}},
    companyEmail:{type:String , trim:true , uniqe:true},
    companyHR:{type:Types.ObjectId , ref:"user"},
    
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})
//virtual for job field
Schema.virtual("job",{
    ref:"job",
    localField:"_id",
    foreignField:"company"
})




export const companyModel=mongoose.model("company", Schema)