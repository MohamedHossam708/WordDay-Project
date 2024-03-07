import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"




export const createjobVal=joi.object({
    jobTitle:joi.string().required(),
    jobLocation:joi.string().required(),
    workingTime:joi.string().required(),
    seniorityLevel:joi.string().required(),
    jobDescription:joi.string().required(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    createdBy:joi.string().custom(isValidObjectId),
    companyName:joi.string().required(),
    id:joi.string().custom(isValidObjectId)
})

export const updatejobVal=joi.object({
    jobTitle:joi.string(),
    jobLocation:joi.string(),
    workingTime:joi.string(),
    seniorityLevel:joi.string(),
    jobDescription:joi.string(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    createdBy:joi.string().custom(isValidObjectId),
    companyName:joi.string(),
    id:joi.string().custom(isValidObjectId)
})

export const deleteJobVal=joi.object({
    companyName:joi.string(),
    id:joi.string().custom(isValidObjectId)
})


export const getOneCompanyVal=joi.object({
    
    companyName:joi.string(),
})

export const getFilterdJobsVal=joi.object({
    workingTime:joi.string(),
    jobLocation:joi.string(), 
    seniorityLevel :joi.string(),
    jobTitle:joi.string(),
    technicalSkills:joi.string(),
})

export const applyval=joi.object({
    userTechSkills:joi.array(),
    userSoftSkills:joi.array(),
    jobId:joi.string().custom(isValidObjectId)

})