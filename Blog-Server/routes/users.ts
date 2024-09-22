import express from "express"
import mongoose, { Mongoose } from "mongoose";
import { USERS } from "../db";
import { Authorize, generatetoken } from "../middlewares";
export const SECRET = 'SECr3t'; 
const router = express.Router()




router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const user =  await USERS.findOne({username,password})
if(user){
  const token=  generatetoken(user)

  res.cookie('authToken', token, {
    httpOnly: true,
    path: '/',
    secure: true, 
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,  
});
    res.json({message:"loggedin"})   
}
else{
    res.json({message:"user not found"})
}
})

router.get("/me",Authorize,async(req,res)=>{
try{
    const data = await USERS.findById(req.headers.userid).populate('Articles_published')
if(data){
    res.json({data:data})
}
else{
    console.log(data)
}
}
catch(e){
    console.log(e)
    res.status(403)
}
})

router.post("/signup",async(req,res)=>{
    const {username,password}=req.body;
    const user =  await USERS.findOne({username:username,password:password})
if(user){
res.json({message:"user exists"})
}
else{
const newuser =  new USERS( {username,password})
await newuser.save()
    const token=  generatetoken(user)
    console.log(token)
    res.cookie('authToken', token, {
        httpOnly: true,
        path: '/',
        secure: false, 
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,  
    });
    res.json({message:token}) 
     

}
})
router.post('/logout', (req, res) => {
    console.log("called")
    res.clearCookie('authToken', {
        path: '/',    // Ensure the path matches how the cookie was set
        httpOnly: true,
        secure: false, // Keep this as false for local development, change to true for production
        sameSite: 'lax',
    });
    
    res.status(200).json({ message: 'Logout successful' });
});

  


export default router