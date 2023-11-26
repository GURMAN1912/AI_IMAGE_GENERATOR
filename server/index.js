import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connnectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();
const app=express();
app.use(cors())
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)
app.use(express.json({limit:'50mb'}))

app.get("/",async(req,res)=>{
    res.json("hello from DALL-E!")
})

const startServer=()=>{
    try{
        connnectDB(process.env.MONGODB_URL)
        app.listen(4000,()=>{
            console.log("server is running on port 4000")
        })
    }
    catch(err){
        console.log(err)

    }
}
startServer()
// pACNoj8VP5VxFk5i