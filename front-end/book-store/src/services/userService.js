
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


async function getAllUsers(){
    return await http.get("/users/")
}
async function AddUser(u){
    return await http.post(`/users`, u)
}
async function getUserById(id){
    return await http.get(`/users/${id}`)
}
    

async function deleteUser(id){
    return await http.delete(`/users/${id}`)
}
async function updateUser(user){
    return await http.put(`/users/${user._id}`, user)
}
async function updateUserMP(user){
    return await http.put(`/users/${user._id}`, user)
}


const userServices={
    userLogin,
    getAllUsers,
    deleteUser,
    AddUser,
    getUserById,
    updateUser,
    updateUserMP
}

export default userServices