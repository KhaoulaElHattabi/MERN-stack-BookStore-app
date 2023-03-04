import '../App.css'
import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import userServices from '../services/userService';


function Navbar(){
  const [hideButton, setHideButton] = useState(false);

const toast = useRef<Toast>(null);
  const  [shouldHide, setShouldHide] = useState(true); 
  const loggedIn= localStorage.getItem('logged')
  const role= localStorage.getItem('role')
  const menu = useRef(null)
  const  [uName, setUName] = useState(""); 
  const  [rolee, setRolee] = useState(""); 
  const  [image, setImage] = useState(""); 
  const  [id, setId] = useState(""); 
  const  [user, setUser] = useState();
  const  [title, setTitle] = useState("");


  useEffect(() => {
    
    // Retrieve data from local storage

const dataa = window.localStorage.getItem("user");

if (dataa) {
  const parsedData = JSON.parse(dataa);
  var role = parsedData.data.role;
  setUName(parsedData.data.username)
  setRolee(parsedData.data.role)
  setId(parsedData.data.id)
  getUser(parsedData.data.id)
  setTitle("Log Out")
  
} else {
  setHideButton(true)
 // console.log('Data not found in local storage.');
  setTitle("Log In")
} 
      if (role == "admin"){
        setShouldHide(false);
       // console.log("Admin :"+shouldHide)
      }
      else 
      {
        setShouldHide(true);
       // console.log("user :"+shouldHide)
      } 
  }, []);
  //console.log("final "+shouldHide)
    const nav =useNavigate()
    function go(){
      nav("/book-add")
    }

    const n =useNavigate()
    function goto(){
      nav("/profile")
    }

    async function getUser(id)
    {
      const resul = await userServices.getUserById(id)
      setUser(resul.data)
      setImage(resul.data.image)
      //console.log(resul.data)
      

    }
    
   



    const logOut=()=>{
      const dataa = window.localStorage.getItem("user");
      if (dataa) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        localStorage.removeItem('logged')
          nav("/store")
        
      } else {
        nav("/login")
      } 
     
      }


      let items = [
        { 
          command: () => { goto() },
          template: (item, options) => {
              return (
                <>
                  {!hideButton && (
  <button onClick={(e) => options.onClick(e)} className={classNames(options.className, 'w-full p-link flex align-items-center')}>
      <Avatar image={image} className="mr-2" shape="circle" />
      <div className="flex flex-column align">
          <span className="font-bold">{uName}</span>
          <span className="text-sm" style={{textTransform: "capitalize"}}>{rolee}</span>

      </div>
  </button>
)}

                  </>
              )
      }},
        
        { label: 'Add Book', icon: 'pi pi-plus',
        command: () => {
          if (role == "admin"){
           go();
          }
        },hidden: shouldHide
        
      },
      
        { label: title, icon: PrimeIcons.SIGN_OUT,
        command: () => {
          logOut()
      }

         },
         
        
      ]

    return(
        <>


<div className="container" style={{borderBottom:"1px solid black"}}>
  <nav className="navbar navbar-expand-lg bg-body-tertiary" >
    <div className="container-fluid">
      <Link className="navbar-brand" to={loggedIn && role === "admin" ? "/admin" : "/user"}>
  <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" style={{ width: "50px", height: "50px" }} />
</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto  mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={loggedIn && role === "admin" ? "/admin" : "/user"}>Home</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/about_us">About Us</Link>
          </li>
          {shouldHide ? null : (
            <li className={`nav-item ${true ? "disabled" : ""}`} >
              <Link className="nav-link " to="/users" style={{ display: "block" }}>Users</Link>
            </li>
          )}
        </ul>
        <Button  icon="pi pi-search" outlined style={{marginLeft:"2px",borderRadius:"15px",width:"45px",height:"45px"}}  severity="info" aria-label="Search" />

        <Menu model={items} popup ref={menu} />
        <Button  icon="pi pi-user" outlined style={{marginLeft:"10px",borderRadius:"15px",width:"45px"}}  severity="info" aria-label="User" onClick={(e) => menu.current.toggle(e)} />
      </div>
    </div>
  </nav>
</div>

</>
    );

          }

export default Navbar;
