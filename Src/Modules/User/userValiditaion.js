import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"
import { asyncHandler } from "../../utlis/asyincHandler.js"

export const signUpValidation= joi.object({
    firstName:joi.string().required().min(2),
    lastName:joi.string().required().min(2),
    email:joi.string().email(). required(),
    recoveryMail:joi.string().email(). required(),
    password:joi.string().required().min(5),
    DOB:joi.date().required(),
    mobileNumber:joi.string().required(),
    role:joi.string()
})

export const signInValiditaion= joi.object({
    email:joi.string().email(),
    mobileNumber:joi.string(),
    password:joi.string().required().min(5)
})


export const updateValiditaion= joi.object({
    firstName:joi.string().min(2),
    lastName:joi.string().min(2),
    email:joi.string().email(),
    password:joi.string().min(5),
    DOB:joi.date(),
    mobileNumber:joi.string(),
    id:joi.string().custom(isValidObjectId).required()
})
   
export const deleteValidiation=joi.object({
    id:joi.string().custom(isValidObjectId).required()

})

export const getUserValidiation=joi.object({
    id:joi.string().custom(isValidObjectId).required()

})

export const updatePasswordval=joi.object({
    password:joi.string().required().min(5),
    id:joi.string().custom(isValidObjectId).required()

})

export const getRecoveryMailVal=joi.object({
    recoveryMail:joi.string().email(),
})
