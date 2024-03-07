import mongoose from "mongoose"


export function mongoConection(){
mongoose.connect(process.env.MongoConn)
.then(()=>{console.log("Mongo is running too ..")})
.catch((err)=>{console.log("DataBase error", err)})
}