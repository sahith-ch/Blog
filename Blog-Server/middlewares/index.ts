

export const SECRET = 'SECr3t'; 
import jwt from "jsonwebtoken"  
import  { Request, Response ,NextFunction} from "express";
export const generatetoken=(user:any )=>{
    return  jwt.sign({userid:user},SECRET,{expiresIn:"1h"})
    }
    
export const Authorize  =(req:Request,res:Response,next:NextFunction)=>{
    const authHeader =req.headers.cookie?.split('; ')
    .find(row => row.startsWith('authToken='))
console.log("user = =  =",authHeader)
    if(authHeader){
        const token = authHeader.split("authToken=")[1]

    jwt.verify(token,SECRET,(err,data)=>{
        if(err){
            console.log(err)
            return res.sendStatus(403);
        }
        if (!data) {
            console.log(data)
            return res.sendStatus(403);
          }
        else{
            if(typeof data ==="string"){
                console.log(data)
                return res.sendStatus(403)
         
            }
            else{     
                console.log(data)
                   req.headers.userid = data.userid._id;
                next();
            
            }
        }
    })
    }else{
        res.sendStatus(403)
    }
}