import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {useState} from 'react'
import userService from "../services/userService";
import { useNavigate } from 'react-router-dom';



 function Login(){

  const [errorMessage, setErrorMessage] = useState("");
  const [uname,setUname]=useState("")
  const [password,setPassword]=useState("")
  const  [loggedIn, setLoggedIn] = useState(false); 

  const navig=useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(uname,password)
    try{
      const token =await userService.userLogin(uname,password)
      console.log(token)
      if(token){
        localStorage.setItem("token",token)
        setLoggedIn(true);
        navig("/PageNotFound")

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
        <Form.Label > Username: </Form.Label>
        <Form.Control type="text"  placeholder="Username" value={uname} onChange={(e)=>setUname(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      
      
      <Button variant="primary" type="submit" >
        Enregistrer
      </Button>
    </Form>
    </>
    );
}

export default Login