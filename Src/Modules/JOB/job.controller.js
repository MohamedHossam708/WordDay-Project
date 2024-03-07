import { applicationModel } from "../../../DataBase/Models/ApplicationModel.js";
import { companyModel } from "../../../DataBase/Models/CompanyModel.js";
import { jobModel } from "../../../DataBase/Models/JobModel.js";
import { asyncHandler } from "../../utlis/asyincHandler.js";
import cloudinary from "../../utlis/cloud.js";
 



export const createJob=asyncHandler(async(req,res,next)=>{



    const CompanyFound= await companyModel.findById(req.params.id)
    if(!CompanyFound)return next(new Error("Company is not found"))
    const dublicatedJob= await jobModel.findOne({jobTitle:req.body.jobTitle ,company:req.params.id })
    if(dublicatedJob) return next (new Error("the job is already existed"))
    //create job
    const jobs= await jobModel.create({
        jobTitle:req.body.jobTitle,
        jobLocation:req.body.jobLocation,
        // i think workingtime need to be enum because the choicess is known 
        workingTime:req.body.workingTime,
        seniorityLevel:req.body.seniorityLevel,
        jobDescription:req.body.jobDescription,
        technicalSkills:req.body.technicalSkills,
        softSkills:req.body.softSkills,
        createdBy:req.user._id,
        company:req.params.id
    })
    // //pushing job in jobs array and making sure the compant existed
    // const company = await companyModel.findOneAndUpdate({companyName:req.body.companyName},{$push:{jobs:jobs.id}})
    // if(!company)return next(new Error("company is not found"))
    res.json({sucess:true , message:"job created"})
})


export const updateJob=asyncHandler(async(req,res,next)=>{
    //find the job that need to be updated
    const job = await jobModel.findById(req.params.id)
    if(!job)return next(new Error("job is not found"))
    //making the updates
    job.jobTitle=req.body.jobTitle?req.body.jobTitle:job.jobTitle
    job.jobLocation=req.body.jobLocation?req.body.jobLocation:job.jobLocation
    job.workingTime=req.body.workingTime?req.body.workingTime:job.workingTime
    job.seniorityLevel=req.body.seniorityLevel?req.body.seniorityLevel:job.seniorityLevel
    job.jobDescription=req.body.jobDescription?req.body.jobDescription:job.jobDescription
    job.technicalSkills=req.body.technicalSkills?req.body.technicalSkills: job.technicalSkills
    job.softSkills=req.body.softSkills?req.body.softSkills:job.softSkills
    // save the changes 
    job.save()
    //sending the response to user
    res.json({sucess:true , message:"job updated"})

})


export const deleteJob=asyncHandler(async(req,res,next)=>{
    //checking the job existince
    const job = await jobModel.findById(req.params.id)
    if(!job)return next(new Error("job is not found"))
    // checking tht owner 
    if(job.createdBy.toString() !== req.user._id.toString()){
        return next(new Error("not authorized user"))
    }
    //deleting the job
    await job.deleteOne()
    res.json({sucess:true , message:"job deleted"})

})

export const getAllJobs=asyncHandler(async(req,res,next)=>{
    const jobs = await jobModel.find().populate("company")
    if(!jobs)return next(new Error("no jobs avilable"))

    res.json({sucess:true , jobs})

})

export const getSpecificCompany=asyncHandler(async(req,res,next)=>{
    
// find all the jobs with and getting there companies
    const jobs = await jobModel.find().populate("company")
    if(!jobs)return next(new Error("no jobs avilable"))
// sending the response
    res.json({sucess:true , jobs})

})

export const getOneCompany=asyncHandler(async(req,res,next)=>{
 // destruct the query
    const { companyName } = req.query
// search in company model to find the company with the name
    const company = await companyModel.findOne({companyName})
    if(!company)return next(new Error("Company  not found"))
// searching in jobs model with company id 
     const jobs =await jobModel.find({company:company._id})
     if (!jobs) 
        return next(new Error("no jobs in this company"));
   res.json({sucess:true , jobs})
})

export const getFilterdJob=asyncHandler(async(req,res,next)=>{
 
    const { sort , page , keyword}= req.query
    
    const jobs = await jobModel.find({...req.query}).sort(sort).paginate(page).search(keyword);
    if (!jobs) {
      return next(new Error("No jobs found"));
    }
  
    res.json({ success: true , jobs});
  });



  export const applyToJob=asyncHandler(async(req,res,send)=>{
    // making sure that the user is snding the cv
    if (!req.file) return next(new Error("please uploade your cv"))
    // uploading the cv
    const {public_id , secure_url}= await cloudinary.uploader.upload(req.file.path , {folder:`${process.env.CLOUD_FOLDER_NAME}/Cvs`})
    // creating the application
   const appliedBefore= await applicationModel.findOne({jobId:req.params.jobId ,userId:req.user._id })
    if(appliedBefore) return next(new Error("you cant apply more than once for the same job"))

    const application = await applicationModel.create({
        jobId:req.params.jobId,
        userId:req.user._id,
        userTechSkills:req.body.userTechSkills,
        userSoftSkills:req.body.userSoftSkills,
        userResume:{
            id:public_id,
            url:secure_url
        }

    })
// sending the response
    res.json({sucess:true , message:"application created"})
  })