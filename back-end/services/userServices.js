const User=require("../models/User")
const bcrypt=require("bcrypt")


const createUser=async(u)=>{
    const salt= await bcrypt.genSalt()
    u.password=await bcrypt.hash(u.password,salt)
    return User.create(u)
}


const getAlUsers=async ()=>{
    return await User.find()
}

const getUser=async(id)=>{
    return await User.findById(id)
}



module.exports={createUser,getAlUsers,getUser}