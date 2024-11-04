import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config({path : "./.env"})
import getConnection from "./utils/getConnection.js"
import userRoutes from "./routes/userRoutes.js"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true , limit : '50mb'}))


app.use('/user',userRoutes)

app.use((error,req,res,next)=>{
       const message = error.message || "server error";
       const statusCode = error.statusCode || 500;

       res.status(statusCode).json({message:message})
})

getConnection()

const PORT = process.env.PORT  || 5555

app.listen(PORT , ()=>console.log(`server is running . . .${process.env.PORT}`));