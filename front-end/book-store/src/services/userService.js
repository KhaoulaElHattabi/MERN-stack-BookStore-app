
import axios from "axios";
import http from "./http-common";

async function userLogin(uName, password){
   try{
        return await http.post("/users/login", { uName, password });
        
    }catch(error){
        if (error.response.status === 400) {
            return { error: "Username not found" };
          } else if (error.response.status === 404) {
            return { error: "Password does not match" };
             } else {
            return { error: "Something went wrong. Please try again later." };
        }
    }
}
    


/*async function getUser(id){
    try{
        await http.get(`/users/${id}`)
    }catch(error){
        return {error: "Password doesn't match"}
    }
}
*/
const userServices={
    userLogin
}

export default userServices