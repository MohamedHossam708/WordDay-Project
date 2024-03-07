import  jwt from "jsonwebtoken"
import {tokenModel} from '../../DataBase/Models/TokenModel.js'
import {userModel} from '../../DataBase/Models/UserModel.js'
import { asyncHandler } from "../utlis/asyincHandler.js"


 export const isAuthenticated = asyncHandler(async(req,res,next)=>{
// checking token existeince
    const token = req.headers.token
    
    if(!token) return next(new Error("token is required"))
// checking token vlaidation
    const tokenDb=await tokenModel.findOne({token , isValied:true })
    if (!tokenDb) return next(new Error("expired Token"))
    
// checkeing user vlaidateion
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    
    //checking user existince
    const user = await userModel.findById(payload.user)
    if (!user) return next(new Error("user not found"))

    req.user = user 
    
    
    
    next()
    

})