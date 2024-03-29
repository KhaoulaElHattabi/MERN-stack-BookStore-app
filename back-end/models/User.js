const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    uName:{type:String,required:true},
    lName:{type:String,required:true},
    fName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    image:{type:String},
    role: { type: String, enum: ['user', 'admin'], default: 'user',required:true }
})

const User=mongoose.model("User",userSchema)
module.exports=User