import React, { useEffect, useState  } from "react";
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import FileBase64 from 'react-file-base64';
import userServices from "../services/userService";
import { useNavigate ,Link} from "react-router-dom";
          
const UpdateProfile = (props) =>{
    const [uName, setUName] = useState("");
    const [lName, setLName] = useState("");
    const [fName, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();
    const [image, setImage] = useState("");
    const [role, setRole] = useState("");
    const [base64String, setBase64String] = useState('');
    const handleFileUpload = (file) => {
      setBase64String(file.base64);
    };
    const n = useNavigate()
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
      setBase64String(res.data.image)
      setPassword(res.data.password)
      console.log(password)
      }
      async function submitUser (event) {
         event.preventDefault();
         if(password==0){
         
         const u={
          "_id":i,
          "uName": uName,
          "lName": lName,
          "fName": fName,
          "email": email,
          "password": password1,
          "image": base64String,
          "role": role,
        } 
        await userServices.updateUser(u)
      }else{
        const u={
          "_id":i,
          "uName": uName,
          "lName": lName,
          "fName": fName,
          "email": email,
          "password": password1,
          "image": base64String,
          "role": role,
        }
         await userServices.updateUser(u)
      }
      if(role=="admin"){
        n("/admin")
      }else{n("/user")}
      }
        
      useEffect(()=>{
        getUser()
    },[])
    return(
        <>
        <Navbar/>

        <div style={{ display: "flex", alignItems: "center" ,textAlign: "center",justifyContent:"center",marginTop:"20px"}}>
        <h2 style={{ margin: "0", paddingRight: "20px" }}>Update Profile</h2>
        <div style={{ width: "90px", height: "70px", borderRadius: "20%", overflow: "hidden", marginRight: "20px" }}>
        <img src={base64String}  style={{ width: "100%", height: "100%" }} />
        </div>
       </div>

<form onSubmit={(event)=>submitUser(event)}  className="row g-3 needs-validation" noValidate style={{maxHeight: "300px", maxWidth:"1000px", margin:"auto",marginTop:"20px", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">User Name</label>
          <input type="text" className="form-control" id="validationCustom01"  required  value={uName}  onChange={event => setUName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">First Name</label>
          <input type="text" className="form-control" id="validationCustom02" required  value={fName}  onChange={event => setFName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Last Name</label>
          <div className="input-group has-validation">
            
            <input type="text" className="form-control" id="validationCustomUsername" value={lName}  onChange={event => setLName(event.target.value)}    aria-describedby="inputGroupPrepend" />
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div  className="col-7">
          <label htmlFor="validationCustom03" className="form-label">Email</label>
          <input  value={email} onChange={event => setEmail(event.target.value)}  type="text" className="form-control" id="validationCustom03" />
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-5">
          <label htmlFor="validationCustom03" className="form-label">Password</label>
          <input type="password" className="form-control" id="validationCustom03"onChange={event => setPassword1(event.target.value)} />
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