import { applicationModel } from "../../../DataBase/Models/ApplicationModel.js";
import { companyModel } from "../../../DataBase/Models/CompanyModel.js";
import { jobModel } from "../../../DataBase/Models/JobModel.js";
import { asyncHandler } from "../../utlis/asyincHandler.js";

////// Big note iam assuming that the hr is the owner it can easly modified on the business need 

export const createCompany=asyncHandler(async(req,res,next)=>{
    // search for company name if it was duplicated
    const companyName = await companyModel.findOne({name:req.body.companyName})
    if(companyName) return next(new Error("This companyName is already used"))
     // search for company companyEmail if it was duplicated
    const companyEmail= await companyModel.findOne({companyEmail:req.body.companyEmail})
    if(companyEmail) return next(new Error("This company Email is already used"))
    //creating company in the collection
    const company = companyModel.create({
        companyName:req.body.companyName,
        description:req.body.description,
        industry:req.body.industry,
        address:req.body.address,
        numberOfEmployess:{min:req.body.numberOfEmployess.min , max:req.body.numberOfEmployess.max},
        companyEmail:req.body.companyEmail,
        companyHR:req.user._id
    })
    // sending the response to user
    res.json({sucess:true , message:"Company created"})
})


export const updateCompant=asyncHandler(async(req,res,next)=>{
    //finding the company from database
    const company= await companyModel.findById(req.params.id)
    if(!company) return next(new Error("company is not found"))
    // insure that even if the user is hr he need to be the owner who created the company
    if(req.user._id.toString() != company.companyHR._id.toString()) return next(new Error("you are not the owner of the company"))
    //making shure that the company name isnt duplicated before updating
    if ( req.body.companyName){
       const companyName= await companyModel.findOne({companyName:req.body.companyName})
        if(companyName) return next(new Error("This companyName is already used"))
        company.companyName=req.body.companyName?req.body.companyName:company.companyName
    }
    //making shure that the company eamil isnt duplicated before updating
    if ( req.body.companyEmail){
        const companyEmail= await companyModel.findOne({companyEmail:req.body.companyEmail})
         if(companyEmail) return next(new Error("This companyEmail is already used"))
         company.companyEmail=req.body.companyEmail?req.body.companyEmail:company.companyEmail
     }
    // update company information
    company.description=req.body.description?req.body.description:company.description
    company.industry=req.body.industry?req.body.industry:company.industry
    company.address=req.body.address?req.body.address:company.address
    company.numberOfEmployess=req.body.numberOfEmployess?req.body.numberOfEmployess:company.numberOfEmployess
    company.companyHR=req.body.companyHR?req.body.companyHR:company.companyHR
     //save the changes
    await company.save()
    res.json({sucess:true , message:"update is done"})
})

export const deleteCompany=asyncHandler(async(req,res,next)=>{
    //finding the company from database
    const company= await companyModel.findById(req.params.id)
    if(!company) return next(new Error("company is not found"))
    // insure that even if the user is hr he need to be the owner who created the company
    if(req.user._id.toString() != company.companyHR._id.toString()) return next(new Error("you are not the owner of the company"))
    // deleteing the data
    await company.deleteOne()
    //sending the response
    res.json({sucess:true , message:"Compant deleted"})
})

export const getCompanyData=asyncHandler(async(req,res,next)=>{
    // finding the company throught the params and using the virtuals for job
    const company= await companyModel.findById(req.params.id).populate('job')
    if(!company)return next(new Error("Company is not found"))
    // insure that even if the user is hr he need to be the owner who created the company
    if(req.user._id.toString() != company.companyHR._id.toString()) return next(new Error("you are not the owner of the company"))
    //sending the results
    res.json({sucess:true , company})
})

export const findByName= asyncHandler(async(req,res,next)=>{
    const company = await companyModel.findOne({companyName:req.body.companyName})
    if(!company)return next(new Error("Theres no company with this name"))
    
    res.json({sucess:true , company})



})

// couldnt complete it 
export const getallTheApplications=asyncHandler(async(req,res,next)=>{
    //finding the spcific job
    const job = await jobModel.findById(req.params.id)
    if(!job)return next(new Error("job is not found"))
    //serching for the company
    const company = await companyModel.findById(job.company)
    if (!company) return next(new Error("company is not found"))
    //making sure that the user  is  the owner (the hr ) 
    if(req.user._id.toString() != company.companyHR._id.toString()) return next(new Error("you are not the owner of the company"))
   
    const applictions = await applicationModel.find({jobId:job._id})
    if(!applictions)next (new Error("no appliction found"))



 
    
    
res.json({sucess:true , applictions})
})