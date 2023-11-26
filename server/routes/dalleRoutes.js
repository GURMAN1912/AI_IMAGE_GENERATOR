import express, { Router } from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from'cloudinary'
import OpenAI from 'openai';

dotenv.config();
const router =express.Router();
const openai =new OpenAI({
    apiKey:process.env.OpenAI_Api_KEY,
})
router.route('/').post(async(req,res)=>{
    try {
        const {prompt}=req.body;
        const aiResponse=await openai.creeateImage({
            prompt,
            n:1,
            size:'1024*1024',
            response_format:'b64_json',
        })
        const image =aiResponse.data.data[0].b64_json;
        res.status(200).json({
            photo:image
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;
// 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