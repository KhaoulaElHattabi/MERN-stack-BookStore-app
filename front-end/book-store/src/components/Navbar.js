import '../App.css'
import React, { useState, useEffect } from 'react';

import { MdAccountCircle } from 'react-icons/md';
import navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Navbar(){

  const  [shouldHide, setShouldHide] = useState(true); 
  useEffect(() => {
    // Retrieve data from local storage
const dataa = window.localStorage.getItem("user");

// Check if the data exists
if (dataa) {
  // Parse the data as a JSON object
  const parsedData = JSON.parse(dataa);
  
  // Access the role attribute of the parsed object
  var role = parsedData.data.role;
  
  // Do something with the role variable
  console.log(role)
  
} else {
  console.log('Data not found in local storage.');
} 
      if (role == "admin"){
        setShouldHide(false);
        console.log("Admin :"+shouldHide)
      }
      else 
      {
        setShouldHide(true);
        console.log("user :"+shouldHide)
      }
      
      
  }, []);
  console.log("final "+shouldHide)
  const nav =useNavigate()
  const  [loggedIn, setLoggedIn] = useState(localStorage.getItem("token")); 
  const logOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
      setLoggedIn(true);
      nav("/login")
    }
    return(
        <>
     <div className="container">
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
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
    )


}

export default Navbar;