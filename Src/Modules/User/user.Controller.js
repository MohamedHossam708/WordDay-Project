import { userModel } from '../../../DataBase/Models/UserModel.js'
import {asyncHandler} from '../../utlis/asyincHandler.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { tokenModel } from '../../../DataBase/Models/TokenModel.js'
import { generate } from 'generate-password'


export const signUp=asyncHandler(async(req,res,next)=>{
    // checking that this email and mobile number doent exist because its uniqe
    const existingUser = await userModel.findOne({
        $or: [
          { email: req.body.email },
          { mobileNumber: req.body.mobileNumber }
        ]
      })
      if(existingUser)return next(new Error("This email or Mobile number is already used"))
    // hashing the password
    const password= bcrypt.hashSync(req.body.password , 8)
    //creating user 
    const user =  await userModel.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.firstName + " "+ req.body.lastName,
        email:req.body.email,
        password,
        DOB:req.body.DOB,
        mobileNumber:req.body.mobileNumber,
        role:req.body.role,
        recoveryMail:req.body.recoveryMail
    })
    res.json({sucess:true , message:"User Created try to login"})


})


export const signIn=asyncHandler(async(req,res,next)=>{
    //destructing  the req.body
    const {email , mobileNumber , password}= req.body
    // using if condetion for the two option to login
   if(email){
    // finding the user from database
    const isUser= await userModel.findOne({email})
    if(!isUser) return next(new Error("This email dosent exist try to signup"))
    //comparing the hashed password with req.password
    const match= await bcrypt.compare(password,isUser.password)
    if(!match) return next(new Error("invalid password"))
    // update the status of the user
    await userModel.findByIdAndUpdate(isUser._id,{status:"online"})
    // create token that contain the userid
    const token = await jwt.sign({user:isUser._id},process.env.SECRET_KEY)
    // saving the token in database token
    const tokendb=await tokenModel.create({token})
    //sending the response to the user
    res.json({sucess:true , message:"Congratz you are logedin" , token} )
   }else{
    // finding the user from database
    const isUser = await userModel.findOne({mobileNumber})
    if(!isUser) return next(new Error("This phone number dosent exist try to signup"))
    //comparing the hashed password with req.password
    const match= await bcrypt.compare(password,isUser.password)
    if(!match) return next(new Error("invalid password"))
    // update the status of the user
    await userModel.findByIdAndUpdate(isUser._id,{status:"online"})
    // create token that contain the userid
    const token = await jwt.sign({user:isUser._id},process.env.SECRET_KEY)
    // saving the token in database token
    const tokendb=await tokenModel.create({token})
    //sending the response to the user
    res.json({sucess:true , message:"Congratz you are logedin",token})
   }
})

export const updateUser=asyncHandler(async(req,res,next)=>{ 

    if(req.body.email){
      const exist= await userModel.findOne({email:req.body.email})
      if(exist) return next(new Error("This mail is already used"))
    req.user.email=req.body.email?req.body.email:req.user.email }
//making sure if the user updated the phoneNumber it dosent conflict with another phoneNumber
    if(req.body.mobileNumber){
        const exist= await userModel.findOne({mobileNumber:req.body.mobileNumber})
      if(exist) return next(new Error("This mobileNumber is already used"))
    req.user.email=req.body.email?req.body.email:req.email }
// applying the updates 
    req.user.DOB=req.body.DOB?req.body.DOB:req.user.DOB
    req.user.firstName=req.body.firstName?req.body.firstName:req.user.firstName
    req.user.lastName=req.body.lastName?req.body.lastName:req.user.lastName

//saving all the updated
    req.user.save()

    res.json({sucess:true , message:"acount updated"})
})

export const deleteUser=asyncHandler(async(req,res,next)=>{

   // delete account by the authentication (req.user)
    await userModel.findByIdAndDelete(req.user._id)
    res.json({sucess:true, message:"user deleted"})
})

export const userData=asyncHandler(async(req,res,next)=>{
    //searching for the user in database
    const isUser = req.user
     res.json({sucess:true , isUser})
})

export const anoterUserData=asyncHandler(async(req,res,next)=>{
    //finding another user by id
    const user = await userModel.findById(req.params.id)
    if(!user)return next(new error("user not found"))

    res.json({sucess:true , user})
})

export const upDatepassword=asyncHandler(async(req,res,next)=>{
// searching for the user in datebase
const isUser = await userModel.findById(req.params.id)
if(!isUser) return next(new Error("User not Found"))
// making suer that only the owner has the abilty to update his account
if(req.user._id.toString() != isUser._id.toString())return next(new Error("Not authorized User"))
//changing the password
isUser.password=req.body.password?req.body.password:isUser.password
// hashing the new password
const hashpassword= await bcrypt.hashSync(isUser.password,8)
isUser.password = hashpassword
//save the change
await isUser.save()

res.json({sucess:true , message:"password changed"})
})

export const forgetPassword=asyncHandler(async(req,res,next)=>{
    //finding the user
    const isUser= await userModel.findOne({email:req.body.email})
    if(!isUser) return next(new Error("invlaid email"))
    //generate otp
    let otp= generate({length:7,numbers:true ,lowercase:true})
    //saving the otp in the model
    isUser.otp=otp
    await isUser.save()

res. json({sucess:true, message:"please try to reset your password",otp})
})
export const resetPassword=asyncHandler(async(req,res,next)=>{
    //finding the uer by the uniq keys
    const isUser= await userModel.findOne({email:req.body.email , mobileNumber:req.body.mobileNumber})
    if(!isUser)next (new Error("user is not found"))
    // making sure that the otp from the user matches the stored otp
    if(isUser.otp.toString() != req.body.otp)return next( new error("invalid otp"))
    //hashing the password
    const hashed=bcrypt.hashSync(req.body.password.toString(),8)
    isUser.password = hashed
    await isUser.save()
    res.json({sucess:true , message:"password reseted"})
})


