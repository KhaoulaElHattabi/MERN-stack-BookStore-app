import '../App.css';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';


function VisitorHome(){
const  [loggedIn, setLoggedIn] = useState(localStorage.getItem("token")); 

const nav =useNavigate()
  
const logOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    setLoggedIn(true);
    nav("/login")
}
useEffect(() => {
    <Navbar />
    
  }, []);
  

    return(
        <>
        <Navbar />
        <div className="pg-not-fd">Visitor Home</div>
        <Button variant="primary" type="submit" onClick={logOut} >
        Logout
      </Button>
        </>
    )
}

export default VisitorHome