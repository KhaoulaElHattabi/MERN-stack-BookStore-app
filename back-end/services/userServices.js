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
const updateUserMp=async (u)=>{
    return await User.findByIdAndUpdate(u._id,u)
}
const updateUser=async (u)=>{
    if (u.password) {
        const salt = await bcrypt.genSalt(10);
        u.password = await bcrypt.hash(u.password, salt);
        return await User.findByIdAndUpdate(u._id,u)
      }
      else{
        return await User.findByIdAndUpdate(u._id,u)
      }
    
}

const getUser=async(id)=>{
    return await User.findById(id)
}

const deleteUserById=async(id)=>{
    return await User.findByIdAndDelete(id)
 }
  

module.exports={createUser,getAlUsers,getUser,deleteUserById,updateUser,updateUserMp}


