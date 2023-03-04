import React from 'react';
import  { useEffect, useState,useRef  } from "react";
import bookService from '../services/bookService';
import { Card } from 'primereact/card';
import Home from './Home';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { SpeedDial } from 'primereact/speeddial';

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { useNavigate, } from 'react-router-dom';
      
const ListOfBooks = (props) => {
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
  const [datePublication, setDatePublication] = useState("");
  const toastt = useRef(null);
    const itemss = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: (event) => {
              setVisible1(true);
            
              
              
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
            confirm2();
                
            }
        },
        
    ];
  const navigate=useNavigate();
  const  [shouldHide, setShouldHide] = useState(true); 
  function scrollToId() {
    const element = document.getElementById('go');
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
  function go(){
    navigate("/book-add")
  }
  const toast = useRef(null);

    const accept = () => {
      deleteBook(cbook._id)
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Book deleted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
       
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to delete '+String(cbook.name)+' ?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
        
    };
  const [visible2, setVisible2] = useState(false);
  const open= ()=>{
    ////console.log(cbook)
    setVisible2(true);
  }
  const menu = useRef(null);
  const items = [
    {
      label: 'Action',
      
        items: [
            { label: 'Supprimer', icon: PrimeIcons.TRASH,command:confirm2 },
            { label: 'Modifier', icon: PrimeIcons.REPLAY,command:open }
        ]
    }
];
  const [cbook,setCbook] = useState("");
  const [id,setId] = useState("");
  const [booksNb,setBooksNb] = useState("");
  const [catNb,setCatNb] = useState("");
  const [auteurNb,setAuteurNb] = useState("");
  const [booksNb24,setBookNb24] = useState("");
  const header = (
    <img className="card-img-top p-2 d-flex justify-content-center " alt="Card" src= {image} style={{maxHeight: "300px",maxWidth:"200px",margin:"auto"}}/>
);
const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    </div>
);
    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    

    const [chosen, setChosen] = useState();

    const footerContent = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
           
        </div>
    );
    
      async function getBookById(chosen){
        const result = await bookService.getBookById(chosen);
        setCbook(result.data);
        //console.log(cbook)
        setId(result.data._id)
        setName(result.data.name)
        setDescription(result.data.description)
        setIsbn(result.data.isbn)
        setAuteur(result.data.auteur)
        setEditeur(result.data.editeur)
        setDate_publication(result.data.date_publication)
        setImage(result.data.image)
        setCategories(result.data.category)
        
      }
    async function getBooks() {
    
        const result = await bookService.getAllBooks();
        setBooks(result.data);
        
        setBooksNb(Object.keys(result?.data).length)
        const result1 = await bookService.getAllCategories();
  
        setCatNb(Object.keys(result1?.data).length)
      }
      

      async function deleteBook(id) {
    
        const result = await bookService.deleteBook(id);
        //console.log("book supprimé")
       getBooks();
      }
      useEffect(() => {
        getDistinctAuthors();
        getBooks();
        getBooksAddedInLastHour();
        const dataa = window.localStorage.getItem("user");
if (dataa) {
  const parsedData = JSON.parse(dataa);
  var role = parsedData.data.role;
  
} else {
  //console.log('Data not found in local storage.');
} 
      if (role == "admin"){
        setShouldHide(false);
       // //console.log("Admin :"+shouldHide)
      }
      else 
      {
        setShouldHide(true);
       // //console.log("user :"+shouldHide)
      }
      }, []);
      async function getDistinctAuthors() {
        const result = await bookService.getAllBooks();
        const books = result.data;
        
        const distinctAuthors = books.reduce((acc, book) => {
          if (!acc.includes(book.auteur)) {
            acc.push(book.auteur);
          }
          return acc;
        }, []);
      
        const numberOfDistinctAuthors = distinctAuthors.length;
        setAuteurNb(numberOfDistinctAuthors)
        //console.log(numberOfDistinctAuthors); // Output: the number of distinct authors in the API data
      }
      async function getBooksAddedInLastHour() {
        const result = await bookService.getAllBooks();
        const books = result.data;
        
        const booksAddedInLastHour = books.filter(book => {
          const addedDate = new Date(book.addedDate);
          const now = new Date();
          const timeDiff = now - addedDate;
          const minutesDiff = Math.round(timeDiff / (1000 * 60)); // convert milliseconds to minutes
          return minutesDiff <= 60;
        });
      
        const numberOfBooksAddedInLastHour = booksAddedInLastHour.length;
        setBookNb24(numberOfBooksAddedInLastHour)
        //console.log(numberOfBooksAddedInLastHour); // Output: the number of books added in the last hour
      }

    
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
              "_id":cbook._id,
              "name": name,
              "description": description,
              "isbn": isbn,
              "auteur": auteur,
              "date_publication": date_publication,
              "editeur": editeur,
              "image": image,
              "category":cat[selectedCat]}
            await  bookService.updateBook(p);  
            setVisible1(false);
            getBooks()
            //console.log("done")
      // Get a reference to the form element
const form = document.querySelector('form');

// Reset the form to its default state
form.reset();

          }
      

  return (
    <>
   <>
      <div className="container">
  <section className="masthead" role="img" aria-label="Image Description">
    <h1>
      The Book House 
    </h1>
    <button className="btn align-self-center" style={{backgroundColor: '#098191', color: 'white'}}onClick={(e) => {scrollToId()}}>Start reading</button>
  </section>
  
</div>
    </>
   <div className="grid justify-content-center" style={{ marginLeft:"0px",marginRight:"0px",marginTop:"10px",marginBottom:"10px" }}>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Books</span>
                    <div className="text-900 font-medium text-xl">+ {booksNb}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-upload text-blue-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">{booksNb24} new </span>
            <span className="text-500">since last day</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Auteur</span>
                    <div className="text-900 font-medium text-xl">{auteurNb}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-user-plus text-orange-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">24+ </span>
            <span className="text-500">since last week</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Categories</span>
                    <div className="text-900 font-medium text-xl">+{catNb}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-align-justify text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">7  </span>
            <span className="text-500">newly registered</span>
        </div>
    </div>
    
</div>
   <p>{books.data}</p>
   <div id='go' className="container" style={{marginTop: '20px'}}>
   {/* <div className="card flex justify-content-center"style={{marginTop: '20px',maxWidth:"100px",margin:"auto"}}>

            <Button label=" Ajouter"onClick={() => {go()}}></Button>
        </div> */}
  <div className="row row-cols-1 row-cols-md-3 g-20">
    
    {books.map((item) => (
      
      <div className="col mb-4" key={item._id} style={{flexBasis:"auto"}}>
        
        <div className="card h-100 ">
        {shouldHide ? null : (
         
            
          <div className="card" style={{borderWidth: '0px'}}>
            
                <Toast ref={toastt} />
                <SpeedDial model={itemss} radius={120} type="quarter-circle" direction="up-left" style={{ right: 6, bottom: -33,width: "4rem", 
  height: "1rem" }} buttonClassName="p-button-help"onClick={(e) => {
    setChosen(item._id);
    getBookById(item._id);
   
}} />
                
            
        </div>
        
          )}
        
        

          <img src={item.image} className="card-img-top p-2 d-flex justify-content-center " alt="book cover" style={{maxHeight: "300px",maxWidth:"200px",margin:"auto"}} />
          <div className="card-body d-flex justify-content-center flex-column">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-title">{item.category.name}</h6>
            <p className="card-text">{item.description}</p>
            <button className="btn align-self-center" style={{backgroundColor: '#098191', color: 'white'}} onClick={() => {
  setVisible(true);
  setChosen(item._id);
  getBookById(item._id)
}} >Détails </button>


          </div>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="card flex justify-content-center"  style={{border:"none",height:"auto"}}>
  <Dialog
    header="Header"
    visible={visible}
    style={{ maxWidth: "600px", margin: "0px",height:"auto"  }}
    onHide={() => setVisible(false)}
    footer={footerContent}
  >
    <div className="card flex justify-content-center">
      <Card
        title={"Nom : " + String(cbook.name)}
        subTitle={"Category : " + String(cbook.category?.name)}
        header={header}
        className="md:w-25rem"
        style={{ maxHeight: "auto", maxWidth: "1000px", margin: "auto", overflow: "hidden",border:"none" }}
      >
        <h4 className="card-title">{String("Auteur : " + cbook.auteur)}</h4>
        <h5 className="card-title">{String("Editeur : " + cbook.editeur)}</h5>
        <h6 className="card-title">{String("Date de publication : " + cbook.date_publication)}</h6>
        {String("Description : " + cbook.description)}
      </Card>
    </div>
  </Dialog>
  <Dialog
    header="Update Book"
    visible={visible1}
    style={{ maxWidth: "auto", margin: "0px",height:"auto"  }}
    onHide={() => setVisible1(false)}
    footer={footerContent}
  >
    <div className="card flex justify-content-center" style={{marginBottom:"20px" }}>
    <h2 style={{ paddingTop:"20px", border:"none",margin:"auto"}}>
      Update Book
    </h2>
       
<form onSubmit={(event)=>submitBook(event)} className="row g-3 needs-validation" noValidate style={{maxHeight: "300px", maxWidth:"1000px", margin:"auto", marginTop:"20px", paddingTop:"20px", border:"none"}}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">Name</label>
          <input value={name} type="text" className="form-control" id="validationCustom01" defaultValue="Mark" required  onChange={event => setName(event.target.value)} />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">Editeur</label>
          <input value= {editeur} type="text" className="form-control" id="validationCustom02" defaultValue="Otto" required  onChange={event => setEditeur(event.target.value)}/>
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Auteur</label>
          <div className="input-group has-validation">
            
            <input value= {auteur} type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required  onChange={event => setAuteur(event.target.value)}/>
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Description</label>
          <input value= {description} type="text" className="form-control" id="validationCustom03" required onChange={event => setDescription(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom03" className="form-label">Isbn</label>
          <input  value= {isbn} type="text" className="form-control" id="validationCustom03" required onChange={event => setIsbn(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">Category</label>
          <select value= {categories} className="form-select" id="validationCustom04" required  onChange={event => setSelectedCat(event.target.value)}>
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
          <input value= {date_publication ? new Date(cbook.date_publication).toISOString().slice(0, 10).split('-').reverse().join('/') : ''} type="text" className="form-control" id="validationCustom05" required onChange={event => setDate_publication(event.target.value)} />
          <div className="invalid-feedback">
            Please provide a valid zip.
          </div>
        </div>
        <div className="col-md-12" style={{marginBottom:"20px" }}>
          <label htmlFor="validationCustom03" className="form-label">Image</label>
          <input value= {image} type="text" className="form-control" id="validationCustom03" required onChange={event => setImage(event.target.value)}/>
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-12" style={{marginTop:20,margin:"auto"}}>
        <Button className=" justify-content-center"  variant="primary" type="submit">
        Submit
      </Button>
        </div>
      </form>
    </div>
    
  </Dialog>
</div>

        <div className="card flex justify-content-center">
         
            <Dialog header="Details" visible={visible2} style={{maxHeight: "600px",maxWidth:"600px",margin:"auto"}}onHide={() => setVisible2(false)} footer={footerContent}>
            <h4 className="card-title">{String("Auteur : "+cbook.auteur)}</h4>
                <h5 className="card-title">{String("Editeur : "+cbook.editeur)}</h5>
                <h6 className="card-title">{String("Date de publication : "+cbook.date_publication)}</h6>
            </Dialog>
        </div>
        
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
               
            </div>
        </>
        
        <div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap" style={{ marginTop:"10px" }}>
    <div className="font-bold mr-8">🔥 Book Store</div>
    <div className="align-items-center hidden lg:flex">
        <span className="line-height-3">Copyright © 2023 ABC Books. All rights reserved.</span>
    </div>
    <a className="flex align-items-center ml-2 mr-8">
        <span className="underline font-bold">Learn More</span>
    </a>
    <a className="flex align-items-center no-underline justify-content-center border-circle text-100 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150" style={{ width: '2rem', height: '2rem' }}>
        <i className="pi pi-times"></i>
    </a>
</div>


    </>
  );
};

export default ListOfBooks;
