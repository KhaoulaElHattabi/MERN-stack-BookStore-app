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

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        
const ListOfBooks = () => {
  function scrollToId() {
    const element = document.getElementById('go');
    element.scrollIntoView({ behavior: 'smooth' });
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
    console.log(cbook)
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
    <img className="card-img-top p-2 d-flex justify-content-center " alt="Card" src={cbook.image} style={{maxHeight: "300px",maxWidth:"200px",margin:"auto"}}/>
);
const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    </div>
);
    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(false);

    const [chosen, setChosen] = useState();

    const footerContent = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    
      async function getBookById(chosen){
        const result = await bookService.getBookById(chosen);
        setCbook(result.data);
        console.log(cbook)
        setId(result.data._id)
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
        console.log("book supprimé")
       getBooks();
      }
      useEffect(() => {
        getDistinctAuthors();
        getBooks();
        getBooksAddedInLastHour();
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
        console.log(numberOfDistinctAuthors); // Output: the number of distinct authors in the API data
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
        console.log(numberOfBooksAddedInLastHour); // Output: the number of books added in the last hour
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
  <div className="row row-cols-1 row-cols-md-3 g-20">
    
    {books.map((item) => (
      
      <div className="col mb-4" key={item._id} style={{flexBasis:"auto"}}>
        <div className="card h-100 ">
        <i className="pi pi-ellipsis-v" style={{ fontSize: '2rem', position: 'absolute', top: '10px', right: '10px' }} onClick={(e) => {
    setChosen(item._id);
    getBookById(item._id);
    menu.current.toggle(e);
}}
><Menu model={items} popup ref={menu} /></i>
        

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
</div>

        <div className="card flex justify-content-center">
         
            <Dialog header="Header" visible={visible2} style={{maxHeight: "600px",maxWidth:"600px",margin:"auto"}}onHide={() => setVisible2(false)} footer={footerContent}>
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
