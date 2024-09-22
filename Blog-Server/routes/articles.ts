import { COMMENTS, POSTS } from './../db/index';
import { Authorize } from './../middlewares/index';
import express  from "express";
import multer from 'multer';
import { USERS } from "../db";

const router= express.Router()

router.get("/me" ,Authorize,async(req,res)=>{

    const user = await USERS.findById(req.headers._id)
    if(user){
    res.json({message:user.Articles_published})
    }
    else{
        res.sendStatus(403);
    }
    })
    
router.post("/" ,Authorize,async(req,res)=>{
    const imagePath = req.file ? req.file.path : null;
    console.log("image",req.body)
    const { Title, Content, description,Image } = req.body;

 
    const post = {
        author : req.headers.userid,
Title:Title,
content:Content,
description:description,
Image:Image,
 likes:[]
    } 



    const newpost = new POSTS(post)

    const user = await USERS.findById(req.headers.userid)

    if(user){
        
 user.Articles_published.push(newpost._id)
 await user.save()
 await newpost.save()

 try{
    res.json({message:"Post created"})
    }
    catch(err){
        console.log(err)
    }
}else{
    
    res.sendStatus(200)

}

})

router.get("/",Authorize,async(req,res)=>{
if(req.headers.userid){
    console.log(req.headers.userid)
   try{
    const posts = await POSTS.find({})
    console.log(posts)
    res.json({posts})
   }catch(e){
res.status(401).send(e)
   }
}
})

router.get("/:id",Authorize,async(req,res)=>{
    if(req.headers.userid){
        console.log(req.headers.userid)
       try{
        const post = await POSTS.findById(req.params.id)
        console.log(post)
        res.json({post})
       }catch(e){
    res.status(401).send(e)
       }
    }
    })




router.put("/likes" ,Authorize,async(req,res)=>{
   
    const postid = req.headers.postid
console.log(req.headers.userid)
try{
const post = await POSTS.findByIdAndUpdate(postid, { $addToSet:{ likes: req.headers.userid} },{new:true})
console.log("post1",post)
if(post){   
    res.json({message:"liked"})
 }
else{
    console.log("post",post)
  
 }}catch(e){
    res.send(e)
 }

})

router.put("/:id" ,async(req,res)=>{
    const {newuser} = req.body
const postid = req.params.id
const post = await POSTS.findByIdAndUpdate(postid,newuser,{new:true})
if(post){
    res.json({post})
}
else{
    res.sendStatus(403)
}

})


export default router