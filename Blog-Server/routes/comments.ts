import express from "express"
import { Authorize } from "../middlewares"
import { COMMENTS, POSTS, USERS } from "../db"

const router = express.Router()

router.post("/:id",Authorize,async(req,res)=>{
    const postid = req.params.id
    const user = await USERS.findById(req.headers.userid)
    const post = await POSTS.findById(postid)
    const comment = {
        content:req.body.content,
        author:user,
        post: post,
    }
    if(user){
if(post){
    const newcomment = new COMMENTS(comment)
    await newcomment.save()
    post.comments.push(newcomment._id)
    await post.save()
res.json({message:"commented succesfully"})
}
else{
    res.sendStatus(403).json({message:"post unavailable"})
}
    }
    else{
        res.sendStatus(403)
    }


})
router.put("/:commentid",Authorize,async(req,res)=>{
    const commentid = req.params.commentid
    const newcomment = await COMMENTS.findByIdAndUpdate(commentid,req.body,{new:true})
    if(newcomment){

res.json({message:"comment updated succesfully"})
    }
    else{
        res.sendStatus(403)
    }


})

router.delete("/:commentid",Authorize,async(req,res)=>{
    const commentid = req.params.commentid
    const newcomment = await COMMENTS.findByIdAndDelete(commentid)
    if(newcomment){

res.json({message:"deleted"})
    }
    else{
        res.sendStatus(403)
    }


})
export default router