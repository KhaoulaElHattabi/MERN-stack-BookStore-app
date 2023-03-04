
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
import { Card } from 'primereact/card';

const FormUser = (props) =>{

  function handleButtonClick() {
    if(button=="Submit"){
      props.toggle();
    }
    else{
      props.toggle();
    }
   
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
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState();
    const [id, setId] = useState(props.value);
    const [image, setImage] = useState("");
    const [chosen, setChosen] = useState();
    const [role, setRole] = useState("");
    const [selectedCat,setSelectedCat]=useState(0);
    const [button,setButton]=useState("Submit");
    const header = (
      
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: '20px', marginRight: '20px' }}>
  <div style={{ width: '60px', height: '60px', borderRadius: '40%', overflow: 'hidden', marginRight: '20px' }}>
    <img src={base64String} style={{ width: '100%', height: '100%' }} />
  </div>
  <div style={{ display: 'block' }}>
  
    <p className="m-0" style={{  fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>{uName}</p>
    <p className="m-0" style={{ textTransform: 'capitalize', fontSize: '1rem', fontWeight: 'normal', marginLeft: '20px' }}>{role}</p>
  </div>
</div>




  );
  
    useEffect(() => {
      if(props.value!= null){
        setButton("Update")
        getUser(id)
      
        
      }
      else{
        //console.log("no props")
      }

     
          }, []);
          const [loading, setLoading] = useState(false);

          const load = () => {
              setLoading(true);
      
              setTimeout(() => {
                  setLoading(false);
              }, 2000);
          };
          async function getUser(id)
    {
      const resul = await userServices.getUserById(id)
      
      setChosen(resul.data)
     // console.log(resul.data)
      setUName(resul.data.uName)
      setLName(resul.data.lName)
      setFName(resul.data.fName)
      setEmail(resul.data.email)
      setBase64String(resul.data.image)
      setRole(resul.data.role)
      setPassword(resul.data.password)
      //console.log(resul.data.password)

      

    }
          async function submitUser (event) {
           // console.log("pwd"+password1)
            
            event.preventDefault();
         
            const res = await userServices.getAllUsers();

            const u={
              "uName": uName,
              "lName": lName,
              "fName": fName,
              "email": email,
              "password": password1,
              "image": base64String,
              "role": role,
            }
            //console.log(u)
            if(props.value!= null){
              if(password1===0){
                // console.log("vide")
                const up={
                  "_id":props.value,
                  "uName": uName,
                  "lName": lName,
                  "fName": fName,
                  "email": email,
                  "password": password,
                  "image": base64String,
                  "role": role,
                }
              // console.log(up)
               await userServices.updateUserMP(up)
               //console.log("Update done")
              
              }
              else
              {
                //console.log("Non Vide")
                const up={
                  "_id":props.value,
                  "uName": uName,
                  "lName": lName,
                  "fName": fName,
                  "email": email,
                  "password": password1,
                  "image": base64String,
                  "role": role,
                }
               //console.log(up)
               await userServices.updateUserMP(up)
               //console.log("Update done")
              }
              
              
            }
            else{
              setButton("Submit")
              await userServices.AddUser(u);
            }
              
          
      /* // Get a reference to the form element
const form = document.querySelector('form');

// Reset the form to its default state
form.reset(); */

          }
    return(
        <>

<div style={{ display: "flex", alignItems: "center" ,textAlign: "center",justifyContent:"center"}}>
<Card header={header}  className="md:w-25rem" style={{ margin: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, marginRight: '20px' }}>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'bold' }}>First Name : {fName}</p>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'normal' }}>Last Name : {lName}</p>
    <p className="m-0" style={{ fontSize: '1rem', fontWeight: 'lighter' }}>{email}</p>
  </div>
  <div style={{ width: '100px', height: '100px', borderRadius: '40%', overflow: 'hidden',marginLeft:'50px' }}>
    <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" style={{ width: '100%', height: '100%' }} />
  </div>
</div>
  </div>
</Card>
</div>

        
<form onSubmit={(event)=>submitUser(event)} className="row g-3 needs-validation" noValidate style={{maxHeight: "400px", maxWidth:"1000px", margin:"auto", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">User Name </label>
          <input type="text" className="form-control" id="validationCustom01" value={uName} required  onChange={event => setUName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">First Name</label>
          <input type="text" className="form-control" id="validationCustom02" required   value={fName} onChange={event => setFName(event.target.value)}/>
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
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">Email</label>
          <input type="text" className="form-control" id="validationCustom03"  value={email} required onChange={event => setEmail(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-6">
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
        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">Password</label>
          <input type="password" className="form-control" id="validationCustom03" required onChange={event => setPassword1(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">Role</label>
          <select value= {role} className="form-select" id="validationCustom04" required onChange={event => setRole(event.target.value)}>
  <option value="">Choose...</option>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</select>


          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>
        
        
        <div className="col-12" style={{ display: "flex", alignItems: "center" ,textAlign: "center",justifyContent:"center"}}>
        <Button style={{marginTop:20}} variant="primary" type="submit"  onClick={handleButtonClick}>
       {button}
      </Button>
  
        </div>
        
        
      </form>
      
        </>
        
    )
}
export default FormUser