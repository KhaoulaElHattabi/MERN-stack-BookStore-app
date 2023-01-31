const express=require("express")
const mongoose=require("mongoose")
const app=express()
mongoose.set('strictQuery', false);

require("dotenv").config()



/* mongoose.connect("mongodb://localhost:27017/db_book_store")
.then(result=>console.log("connction effectuée"))
.catch(error=>console.log(error)) */

mongoose.connect(
    "mongodb+srv://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) console.log("Mongodb connected");
      else console.log("Connection error :" + err);
    }
  )

app.listen(8899,()=>{
    console.log("Server is running")
})


/* mongoose.connect(process.env.MONGO_URL).then(result=>
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running ...")
    })
   
    ).catch(error=>console.log(error))
 */






