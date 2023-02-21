const userService=require("../services/userServices")


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
        console.log("to add",req.body)
        res.status(500).json(error)
    }
}

module.exports={
    addUser,getUsers
}