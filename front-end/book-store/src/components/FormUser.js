
import React, { useState,useEffect,useRef  } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import userServices from "../services/userService";
import { useNavigate, } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import bookService from "../services/bookService";
const FormUser = (props) =>{

  function handleButtonClick() {
    props.toggle();
  }
  const toast = useRef(null);

    const onUpload = (file) => {
      setBase64String(file.base64);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
  const [base64String, setBase64String] = useState('');

  const handleFileUpload = (file) => {
    setBase64String(file.base64);
  };
 
    const navigate=useNavigate();
    const [uName, setUName] = useState("");
    const [lName, setLName] = useState("");
    const [fName, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswordr] = useState("");
    
    const [image, setImage] = useState("");

    const [role, setRole] = useState("");
    const [selectedCat,setSelectedCat]=useState(0);
    
    useEffect(() => {
   
          }, []);
          const [loading, setLoading] = useState(false);

          const load = () => {
              setLoading(true);
      
              setTimeout(() => {
                  setLoading(false);
              }, 2000);
          };
          async function submitUser (event) {
            
            
            event.preventDefault();
         
            

            const u={
              "uName": uName,
              "lName": lName,
              "fName": fName,
              "email": email,
              "password": password,
              "image": base64String,
              "role": role,
            }
            console.log(u)
            await userServices.AddUser(u);  
          
      // Get a reference to the form element
const form = document.querySelector('form');

// Reset the form to its default state
form.reset();

          }
    return(
        <>

        <h2 style={{ paddingTop:"20px", border:"none"}}>
      Add User
    </h2>
        
<form onSubmit={(event)=>submitUser(event)} className="row g-3 needs-validation" noValidate style={{maxHeight: "300px", maxWidth:"1000px", margin:"auto",marginTop:"20px", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">User Name</label>
          <input type="text" className="form-control" id="validationCustom01"  required  onChange={event => setUName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">First Name</label>
          <input type="text" className="form-control" id="validationCustom02" required  onChange={event => setFName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Last Name</label>
          <div className="input-group has-validation">
            
            <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required value={lName} onChange={event => setLName(event.target.value)}/>
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Email</label>
          <input type="text" className="form-control" id="validationCustom03" required onChange={event => setEmail(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Password</label>
          <input type="password" className="form-control" id="validationCustom03" required onChange={event => setPasswordr(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">Role</label>
          <select className="form-select" id="validationCustom04" required onChange={event => setRole(event.target.value)}>
  <option disabled value>Choose...</option>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</select>

          <div className="invalid-feedback">
            Please select a valid state.
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
        <Button style={{marginTop:20}} variant="primary" type="submit"  onClick={handleButtonClick}>
        Submit
      </Button>
  
        </div>
        
        
      </form>
      <div style={{maxHeight: "300px", maxWidth:"1000px",  marginTop:"20px", paddingTop:"20px", border:"none"}}>

        <img src={base64String} className="card-img-top p-2 d-flex  " alt="book cover" style={{maxHeight: "250px",maxWidth:"125px"}} />
        </div>
        </>
        
    )
}
export default FormUser