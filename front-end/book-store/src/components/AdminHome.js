import '../App.css';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ListOfBooks from './ListOfBooks';

function AdminHome(){

      return(
        <>
         <Navbar />
         <ListOfBooks />
         
        <div className="pg-not-fd">Admin Home</div>
       
      </>
    )
}

export default AdminHome
