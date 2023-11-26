import mongoose from "mongoose";
const connnectDB=(url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>console.log('mongoDB connected'))
    .catch((err)=>console.log(err))
}
export default connnectDB;