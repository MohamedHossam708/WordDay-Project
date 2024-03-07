import express from 'express'
import { mongoConection } from './DataBase/dbConnection.js'
import dotenv from 'dotenv'
import userRouter from './Src/Modules/User/userRoutes.js'
import companyRouter from './Src/Modules/Company/Company.routes.js'
import jobRouter from './Src/Modules/JOB/job.router.js'
dotenv.config()


const app = express()
const port = 3000


app.use(express.json())
mongoConection()

app.use('/',userRouter)
app.use('/',companyRouter)
app.use('/',jobRouter)






app.all("*",(req,res,next)=>{
    return next(new Error("page Not Found"))
})

app.use((error,req,res,next)=>{
   
    return res.send({
        sucess:false,
        message:error.Message,
        satck:error.stack
    })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`WorkDay is Running .... ${port}!`))