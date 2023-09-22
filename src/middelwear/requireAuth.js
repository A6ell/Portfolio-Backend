import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";

export const requireAuth = async (req,res,next)=>{
    //verify auth
   const {authorization} = req.headers;
   
   if(!authorization){
    return res.status(401).json({error: "Authorization token required"},)
   }
   
   const token = authorization.split(" ")[1]

   try{

    const {_id} = jwt.verify(token,"ABEBEBESOBELA")

    req.user = await User.findOne({_id}).select('_id')
    next()

   }catch(error){
        console.log(error);
        res.status(401).json({error:'request is not authorized'})
   }
}