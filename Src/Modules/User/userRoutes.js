import  {Router}  from "express";
import { anoterUserData, deleteUser, forgetPassword,  resetPassword, signIn, signUp, upDatepassword, updateUser, userData } from "./user.Controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import {   getUserValidiation, signInValiditaion, signUpValidation, updatePasswordval, updateValiditaion } from "./userValiditaion.js";
import { isAuthenticated } from "../../middleware/authentication.middeleware.js";


const router=Router()
// signup 
router.post('/signUp',validation(signUpValidation),signUp)
//signin 
router.post('/signIn',validation(signInValiditaion), signIn) 
//update user
router.patch('/updateUser/:id',isAuthenticated,validation(updateValiditaion),updateUser)

//delete user
router.delete('/deleteUser',isAuthenticated,deleteUser)
// get user information
router.get('/userData',isAuthenticated,userData)
//finding another user by id
router.get('/anoterUserData/:id',isAuthenticated,validation(getUserValidiation),anoterUserData)
// update password
router.patch('/updatePassword/:id',isAuthenticated,validation(updatePasswordval),upDatepassword)
// forget password step 1
router.post('/forgetPassword',forgetPassword)
//resrt password step 2
router.post('/resetPassword',resetPassword)

export default router