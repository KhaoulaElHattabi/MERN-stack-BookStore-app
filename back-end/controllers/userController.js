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
                role:user.role,
                token
                
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



    const deleteUser=async(req,res)=>{
        try{
        await userService.deleteUserById(req.params.id)
            res.status(200).json("User deleted succesfully")
        }catch(error){
            res.status(500).json(error)
        }
    }
    const updateUser=async(req,res)=>{
        try{
        await userService.updateUser(req.body)
            res.status(200).json("User update succesfully")
        }catch(error){
            res.status(500).json(error)
        }
    }
    const updateUserMP=async(req,res)=>{
        try{
        await userService.updateUser(req.body)
            res.status(200).json("User update succesfully")
        }catch(error){
            res.status(500).json(error)
        }
    }
    

        
module.exports={
    addUser,getUsers,userLogin,getUser,deleteUser,updateUser,updateUserMP
    }

