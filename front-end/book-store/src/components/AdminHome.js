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
         
        
       
      </>
    )
}

export default AdminHome
