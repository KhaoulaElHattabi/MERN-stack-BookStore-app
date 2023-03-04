
import React, { useState,useEffect,useRef  } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Navbar from './Navbar';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import bookService from "../services/bookService";
import { useNavigate, } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
const FormBook = () =>{
  const toast = useRef(null);

    const onUpload = (file) => {
      setBase64Stimagering(file.base64);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
  const [base64String, setBase64String] = useState('');

  const handleFileUpload = (file) => {
    setBase64String(file.base64);
  };
 
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isbn, setIsbn] = useState("test");
    const [auteur, setAuteur] = useState("");
    const [editeur, setEditeur] = useState("");
    const [date_publication, setDate_publication] = useState("");
    const [image, setImage] = useState("");
    const [categories,setCategories]=useState([]);
    const [cat, setCat] = useState([]);
    const [selectedCat,setSelectedCat]=useState(0);
    async function getAllCategories(){
        const result = await bookService.getAllCategories();
       
        setCat(result.data)
        //console.log(result.data)
    }
    useEffect(() => {
        getAllCategories();
          }, []);
          const [loading, setLoading] = useState(false);

          const load = () => {
              setLoading(true);
      
              setTimeout(() => {
                  setLoading(false);
              }, 2000);
          };
          async function submitBook (event) {
            event.preventDefault();
            

            const p={
              "name": name,
              "description": description,
              "isbn": isbn,
              "auteur": auteur,
              "date_publication": date_publication,
              "editeur": editeur,
              "image": base64String,
              "category":cat[selectedCat]}
            await  bookService.addBook(p);  
            navigate("/admin")
      // Get a reference to the form element
const form = document.querySelector('form');

// Reset the form to its default state
form.reset();

          }
    return(
        <>
        <Navbar/>
        <div style={{ display: "flex", alignItems: "center" ,textAlign: "center",justifyContent:"center",marginTop:"20px"}}>
  <h3 style={{ margin: "0", paddingRight: "20px" }}>Add Book</h3>
  
  <div style={{ width: "50px", height: "50px", borderRadius: "40%", overflow: "hidden", marginRight: "20px" }}>
    <img src={base64String}  style={{ width: "100%", height: "100%" }} />
  </div>
  <td style={{ padding: "14px" }}>
  
  </td>
</div>
<form onSubmit={(event)=>submitBook(event)} className="row g-3 needs-validation" noValidate style={{maxHeight: "300px", maxWidth:"1000px", margin:"auto",marginTop:"20px", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">Name</label>
          <input type="text" className="form-control" id="validationCustom01"  required  onChange={event => setName(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">Editeur</label>
          <input type="text" className="form-control" id="validationCustom02" required  onChange={event => setEditeur(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Auteur</label>
          <div className="input-group has-validation">
            
            <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required value={auteur} onChange={event => setAuteur(event.target.value)}/>
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Description</label>
          <input type="text" className="form-control" id="validationCustom03" required onChange={event => setDescription(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Isbn</label>
          <input type="text" className="form-control" id="validationCustom03" required onChange={event => setIsbn(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">Category</label>
          <select className="form-select" id="validationCustom04" required  onChange={event => setSelectedCat(event.target.value)}>
            <option  disabled value>Choose...</option>
            {
        cat.map((elem,index)=>{
          return <option value={index} key={index}>{elem.name}</option>
        })
      }
          </select>
          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">Date Publication</label>
          <input type="date" className="form-control" id="validationCustom05" required onChange={event => setDate_publication(event.target.value)} />
          <div className="invalid-feedback">
            Please provide a valid zip.
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
export default FormBook