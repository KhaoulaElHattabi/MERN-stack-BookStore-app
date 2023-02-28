import '../App.css'
import React, { useState, useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';




function Navbar(){

  const  [shouldHide, setShouldHide] = useState(true); 
  const loggedIn= localStorage.getItem('logged')
  const role= localStorage.getItem('role')


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



       
      

    
    return(
        <>
     <div className="container">
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand"  href={loggedIn && role === "admin" ? "/admin" : "/user"}><img src="https://cdn.logo.com/hotlink-ok/logo-social.png"alt="hyper" height={50} className="mb-3" /></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href={loggedIn && role === "admin" ? "/admin" : "/user"}>Home</a>
          </li>
          <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
         <a className="nav-link" href="/about_us">About Us</a>
      </li>
          {shouldHide ? null : (
          <li className={`nav-item ${true ? "disabled" : ""}`} >
            <a className="nav-link " style={{ display: "block" }}  >Users</a>
          </li>
          )}
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit" onClick={logOut} >Logout</button>
        </form>
        <MdAccountCircle size={32} style={{ marginLeft: 10, marginRight: 10 }} />
      </div>
    </div>
  </nav>
</div>


</>
    );

          }

export default Navbar;