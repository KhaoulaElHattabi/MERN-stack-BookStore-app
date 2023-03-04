
import React, { useEffect, useState  } from "react";
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import FileBase64 from 'react-file-base64';
import userServices from "../services/userService";


          
const UpdateProfile = (props) =>{

    const [uName, setUName] = useState("");
    const [lName, setLName] = useState("");
    const [fName, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswordr] = useState("");
    
    const [image, setImage] = useState("");

    const [role, setRole] = useState("");
    const [base64String, setBase64String] = useState('');

    const handleFileUpload = (file) => {
      setBase64String(file.base64);
    };


    //const usr = window.localStorage.getItem("user");
    const parsedData = JSON.parse(window.localStorage.getItem("user"));
    //console.log(parsedData.data.id)
    const i=parsedData.data.id


      async function getUser(){
      const res= await userServices.getUserById(i)
      setUName(res.data.uName)
      setLName(res.data.lName)
      setFName(res.data.fName)
      setEmail(res.data.email)
      setRole(res.data.role)
      console.log(email)
      }

      useEffect(()=>{
        getUser()
    },[])


    return(
        <>
        <Navbar/>
        <h2 style={{ paddingTop:"20px", border:"none"}}>
      Update Profile
    </h2>
        
<form className="row g-3 needs-validation" noValidate style={{maxHeight: "300px", maxWidth:"1000px", margin:"auto",marginTop:"20px", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">User Name</label>
          <input type="text" className="form-control" id="validationCustom01"  required  value={uName} />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">First Name</label>
          <input type="text" className="form-control" id="validationCustom02" required  value={fName}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Last Name</label>
          <div className="input-group has-validation">
            
            <input type="text" className="form-control" id="validationCustomUsername" value={lName} aria-describedby="inputGroupPrepend" />
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div  className="col-7">
          <label htmlFor="validationCustom03" className="form-label">Email</label>
          <input  value={email} type="text" className="form-control" id="validationCustom03" />
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-5">
          <label htmlFor="validationCustom03" className="form-label">Password</label>
          <input type="password" className="form-control" id="validationCustom03" />
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationCustom03" className="form-label">Image</label>
          <div className="form-control">
          <FileBase64
        multiple={false}
        onDone={handleFileUpload}
      /></div>
       
     
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-12">
        <Button style={{marginTop:20}} variant="primary" type="submit">
        Submit
      </Button>
  
        </div>
      </form>
        </>
        
    )
}
export default UpdateProfile