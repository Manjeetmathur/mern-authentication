import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config({path : "./.env"})
import getConnection from "./utils/getConnection.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import path from 'path'
const app = express()

const __dirname = path.resolve()
console.log(__dirname);

app.use(cookieParser())
app.use(cors({
       origin:"*",
       credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true , limit : '50mb'}))


app.use('/user',userRoutes)

app.use(express.static(path.join(__dirname,"/user/build")))
app.get("*",(req,res) => {
       res.sendFile(path.resolve(__dirname, "user", "build" , "index.html"))
})

app.use((error,req,res,next)=>{
       const message = error.message || "server error";
       const statusCode = error.statusCode || 500;

       res.status(statusCode).json({message:message})
})

getConnection()

const PORT = process.env.PORT 

app.listen(PORT || 5555 , ()=>console.log(`server is running . . .${process.env.PORT}`));