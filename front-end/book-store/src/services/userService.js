
import http from "./http-common";

async function userLogin(uName, password){
   try{
        const res= await http.post("/users/login", { uName, password });
        return res.data.token
      }catch(error){
       console.log(error)
      }
}

const userServices={
    userLogin
}

export default userServices