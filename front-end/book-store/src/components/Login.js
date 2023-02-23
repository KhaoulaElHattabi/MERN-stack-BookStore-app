import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {useState} from 'react'
import userService from "../services/userService";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




 function Login(){

  const [errorMessage, setErrorMessage] = useState("");
  const [uname,setUname]=useState("")
  const [password,setPassword]=useState("")
  const  [loggedIn, setLoggedIn] = useState(false); 

  const navig=useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    
    try{
      const user =await userService.userLogin(uname,password)

      if(user.error){

        setErrorMessage(user.error)

      }else{

      console.log(user.data.role)
      localStorage.setItem("token",user.token)
      setLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(user))

      if(user.data.role==="admin"){
        navig("/admin")
      }else navig("/user")
    }
    }catch(error){
      console.log(error)
    }
  }


    return(
        <>
        <h3 className="MarginText">Login</h3>

        <Form className="login" onSubmit={loginUser}  >
      <Form.Group className="mb-3" >
        <Form.Label className="cred" > Username: </Form.Label>
        <Form.Control type="text"  placeholder="Username" value={uname} onChange={(e)=>setUname(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label  className="cred">Password:</Form.Label>
        <Form.Control type="password"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" >
        Login
      </Button>
    </Form>
    <br></br>
      <div>Error Message : {errorMessage}</div>
    </>
    );
}

export default Login
