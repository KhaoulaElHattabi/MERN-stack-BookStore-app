const express=require("express")
const mongoose=require("mongoose")
const app=express()
const catRoutes=require("./routes/categoryRoutes")
mongoose.set("strictQuery",false)
const bookRoutes=require("./routes/bookRoutes");
const usrRoutes=require("./routes/userRoutes")
const cors=require("cors")

require("dotenv").config()


app.use(cors())
app.use(express.json())
app.use("/categories",catRoutes)
app.use("/books",bookRoutes)
app.use("/users",usrRoutes)



 mongoose.connect(process.env.MONGO_URL).then(result=>
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running ...")
    })
   
    ).catch(error=>console.log("Databbase not connected",error))

/*
app.listen(process.env.PORT,()=>{
      console.log("Server is running",process.env.PORT)
  })
/* mongoose.connect("mongodb://localhost:27017/db_book_store")
.then(result=>console.log("connction effectuée"))
.catch(error=>console.log(error)) */

/*mongoose.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) console.log("Mongodb connected");
      else console.log("Connection error :" + err);
    }
  )
*/