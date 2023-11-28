import express, { Router } from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from'cloudinary'
import OpenAI from 'openai';

dotenv.config();
const router =express.Router();
const openAi =new OpenAI({
    apiKey:process.env.OpenAI_Api_KEY,
})
router.route('/').get(async(req,res)=>{
    res.json("hello")
})
router.route('/').post(async(req,res)=>{
    try {
        console.log(req.body);
        const {prompt}=req.body;
        
        const aiResponse=await openAi.images.generate({
            prompt,
            n:1,
    })
        const image =aiResponse.data.data[0].url;
        res.status(200).json({
            photo:image
        })
    } catch (error) {
        console.log(error)
    }
})

export default router;
// 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