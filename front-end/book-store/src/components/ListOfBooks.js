import React from 'react';
import  { useEffect, useState } from "react";
import bookService from '../services/bookService';
import Navbar from './Navbar';
import Test from './Test';
const ListOfBooks = () => {
    const [books, setBooks] = useState([]);


    async function getBooks() {
    
        const result = await bookService.getAllBooks();
        setBooks(result.data);
        console.log(result)
      }
      useEffect(() => {
        getBooks();
      }, []);
  return (
    <>
    
   <Test></Test> 
   <div className="container" style={{marginTop: '20px'}}>
  <div className="row row-cols-1 row-cols-md-3 g-4">
    {books.map((item) => (
      <div className="col mb-4" key={item._id}>
        <div className="card h-100 ">
          <img src={item.image} className="card-img-top p-2 d-flex justify-content-center" alt="book cover" style={{maxHeight: "200px",maxWidth:"200px"}} />
          <div className="card-body d-flex justify-content-center flex-column">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <button className="btn align-self-center" style={{backgroundColor: '#098191', color: 'white'}}>Action</button>


          </div>
        </div>
      </div>
    ))}
  </div>
</div>




    </>
  );
};

export default ListOfBooks;
