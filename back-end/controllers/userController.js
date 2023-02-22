const User = require("../models/User")
const userService=require("../services/userServices")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')



const addUser=async(req,res)=>{
    try{
        await userService.createUser(req.body)
       res.status(201).json("User added succesfully") 
    }catch(error){
        console.log("erreur",error)
        console.log("to add",req.body)
     res.status(500).json(error)
}
}

const getUsers=async(req,res)=>{
    try{
        const users=await userService.getAlUsers( )
        res.status(200).json(users) 
    }catch(error){
        console.log("erreur",error)
        res.status(500).json(error)
    }
}


const userLogin=async (req,res)=>{
      const {uName,password}=req.body

      try{

        const user = await User.findOne({uName})

        if (!user){
            return res.status(400).send({ error: "Username not found" })
        }
            const checkPassword = await bcrypt.compare(password,user.password)
            if (!checkPassword){
                return res.status(404).send({error: "Password does not match"})
            }
            const token = jwt.sign({
                id: user._id,
                username:user.uName
            }, 'secret',
            {expiresIn: "24h"});

            return res.status(200).send({
                msg: "Login successful...!",
                username: user.uName,
                id:user._id,
                token,
                
              });

        }catch(error){
            return res.status(500).json(error);
        }
       
    }


    const getUser=async (req,res)=>{
        try{
            const u=await userService.getUser(req.params.id)
            res.status(200).json(u)
            }
           catch(error){
            res.status(500).json(error)
          
        }
    }

/*
const verifyUser=async(req,res,next)=>{
    try{
         const{uName}=req.method=="GET" ? req.query : req.body
            let exist=await User.findOne({uName})
            if(!exist)
        
                
        }catch(error){
            return res.status(404).send({error:"Authentification error"})
        }
    }
      */  
        
        
        
module.exports={
    addUser,getUsers,userLogin,getUser
    }


/*const userLogin=async (req,res)=>{
    const {usr,password}=req.body

    try{
      User.findOne({usr})
          .then(user=>{
              bcrypt.compare(password,user.password)
                  .then(passwordCheck=>{

                      if(!passwordCheck) return res.status.send({error: "Password not found"})

                      //jwt token
                      const token = jwt.sign({
                                      userId: user._id,
                                      username:user.uName
                                  }, 'secret', {expiresIn: "24h"});

                      return res.status(200).send({
                          msg:"Login successful...!",
                          username:user.uName,
                          token
                      })
                  })
                  .catch(error=>{
                      return res.status(400).send({error: "Password does not match"})
                  })
          })
          .catch(error=> {
              return res.status(40).send({ error : "Username not found"});
          
          })
    }catch(error){
      return res.status(500).json(error)
    }

}*/
