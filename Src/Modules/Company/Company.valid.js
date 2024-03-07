import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"




export const createCompanyVal= joi.object({
    companyName:joi.string(),
    description:joi.string().required(),
    industry:joi.string().required(),
    address:joi.string().required(),
    companyName:joi.string().required(),
    numberOfEmployess:joi.object({min:joi.number() , max:joi.number()}),
    companyEmail:joi.string().email().required(),
    companyHR:joi.string().custom(isValidObjectId)
})

export const updatecompanyVal= joi.object({
    companyName:joi.string(),
    description:joi.string(),
    industry:joi.string(),
    address:joi.string(),
    companyName:joi.string(),
    numberOfEmployess:joi.object({min:joi.number() , max:joi.number()}),
    companyEmail:joi.string().email(),
    companyHR:joi.string().custom(isValidObjectId),
    id:joi.string().custom(isValidObjectId)
})

export const deleteCompanyVal=joi.object({
    id:joi.string().custom(isValidObjectId).required()
})


export const findByNameVal=joi.object({
    companyName:joi.string(),
})

export const allapplications=joi.object({
    id:joi.string().custom(isValidObjectId).required()

})

