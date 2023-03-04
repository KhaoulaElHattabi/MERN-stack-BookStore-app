import React from "react";
import Navbar from "./Navbar";
import imag from "../assets/error.jpg"




export default function PageNotFound(){
    return(
        <>
        <Navbar/>
        <div>
        <img src={imag} style={{width:"80%"}}></img>
        </div>
        </>
    )
}