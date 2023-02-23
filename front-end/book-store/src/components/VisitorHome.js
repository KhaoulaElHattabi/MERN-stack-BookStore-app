import '../App.css';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom'


function VisitorHome(){
const  [loggedIn, setLoggedIn] = useState(localStorage.getItem("token")); 

const nav =useNavigate()
  
const logOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setLoggedIn(true);
    nav("/login")
}
  

    return(
        <>
        <div className="pg-not-fd">Visitor Home</div>
        <Button variant="primary" type="submit" onClick={logOut} >
        Logout
      </Button>
        </>
    )
}

export default VisitorHome