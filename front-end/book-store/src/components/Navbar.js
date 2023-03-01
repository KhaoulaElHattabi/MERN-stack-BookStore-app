import '../App.css'
import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import { PrimeIcons } from 'primereact/api';



function Navbar(){

  const  [shouldHide, setShouldHide] = useState(true); 
  const loggedIn= localStorage.getItem('logged')
  const role= localStorage.getItem('role')
  const menu = useRef(null)


  useEffect(() => {

    // Retrieve data from local storage

const dataa = window.localStorage.getItem("user");

if (dataa) {

  const parsedData = JSON.parse(dataa);
  
  var role = parsedData.data.role;

  
} else {
  console.log('Data not found in local storage.');
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

    
   



    const logOut=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      localStorage.removeItem('logged')
        nav("/login")
      }


      let items = [
        { label: 'Profile', icon: 'pi pi-fw pi-user' },
        { label: 'Update', icon: 'pi pi-refresh',
        command: () => {
            
        }
      },
        { label: 'Log Out', icon: PrimeIcons.SIGN_OUT,
        command: () => {
          logOut()
      }

         }
        
      ]


       
      

    
    return(
        <>


<div className="container" style={{borderBottom:"1px solid black"}}>
  <nav className="navbar navbar-expand-lg bg-body-tertiary"  style={{padding: "11px"}}>
    <div className="container-fluid">
      <Link className="navbar-brand" to={loggedIn && role === "admin" ? "/admin" : "/user"}>Droppify</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto  mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={loggedIn && role === "admin" ? "/admin" : "/user"}>Home</Link>
          </li>
          <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </Link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link class="dropdown-item" to="#">Action</Link>
              <Link class="dropdown-item" to="#">Another action</Link>
              <div class="dropdown-divider"></div>
              <Link class="dropdown-item" to="#">Something else here</Link>
            </div>
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
        <Button  icon="pi pi-search" outlined style={{marginLeft:"2px",borderRadius:"15px",width:"45px"}}  severity="info" aria-label="Search" />

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
