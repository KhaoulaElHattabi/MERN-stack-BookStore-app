import '../App.css';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ListOfBooks from './ListOfBooks';

function AdminHome(){
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
     //console.log("Page Admin"+localStorage.getItem('role'))
    }, []);

    return(
        <>
         <Navbar />
         <ListOfBooks />
        <div className="pg-not-fd">Admin Home</div>
        <Button variant="primary" type="submit" onClick={logOut} >
        Logout
      </Button>
      </>
    )
}

export default AdminHome
