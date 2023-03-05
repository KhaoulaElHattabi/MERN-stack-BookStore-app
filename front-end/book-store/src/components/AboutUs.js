import React,{useState} from "react";
import Navbar from "./Navbar";

import karimImage from '../assets/karim.JPG';
import khaoula from '../assets/khaoula.jpg';
import oussama from '../assets/oussama.jpg';
import FileBase64 from 'react-file-base64';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
export default function AboutUs(){
  return (
    <>
    <Navbar></Navbar>
    

<div className="surface-0">
    <div className="text-900 font-bold text-6xl mb-4 text-center">Team Membres</div>
    <div className="text-700 text-xl mb-6 text-center line-height-3">Software Engineering at @ EMSI.</div>

    <div className="grid" style={{marginRight:"5px",marginLeft:"5px"}}>
        <div className="col-11 lg:col-4">
            <div className="p-3 h-full">
                <div className="shadow-2 p-3 h-full " style={{ borderRadius: '6px' }}>
                    <div className="text-900 font-medium text-xl mb-2">Karim Ait Bouaddi</div>
                    <div className="text-600">Software Developer</div>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    <div className="">
  <img src={karimImage}  style={{ width: '200px', height: '250px',maxWidth:'300px',maxHeight:'300px' }} />
  
</div>

                    <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                    <Button label="Contact Me" className="p-3 w-4 mt-auto" />
                </div>
            </div>
        </div>

        <div className="col-11 lg:col-4">
            <div className="p-3 h-full">
                <div className="shadow-2 p-3 h-full " style={{ borderRadius: '6px' }}>
                    <div className="text-900 font-medium text-xl mb-2">khaoula El Hattabi</div>
                    <div className="text-600">Software Developer</div>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    <div className="">
  <img src={khaoula} style={{ width: '250px', height: '250px',maxWidth:'300px',maxHeight:'300px' }} />
  
</div>

                    <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                    <Button label="Contact Me" className="p-3 w-4 mt-auto" />
                </div>
            </div>
        </div>

        <div className="col-11 lg:col-4">
            <div className="p-3 h-full">
                <div className="shadow-2 p-3 h-full " style={{ borderRadius: '6px' }}>
                    <div className="text-900 font-medium text-xl mb-2">Oussama Gabbany</div>
                    <div className="text-600">Software Developer</div>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    <div className="">
  <img src={oussama} style={{ width: '200px', height: '250px',maxWidth:'300px',maxHeight:'300px' }} />
  
</div>

                    <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                    <Button label="Contact Me" className="p-3 w-4 mt-auto" />
                </div>
            </div>
        </div>
    </div>
</div>

<div className="flex align-items-center justify-content-center">
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Message</label>
            <InputText id="text" type="text" placeholder="Message" className="w-full mb-3" />

            <div className="flex align-items-center justify-content-between mb-6">
                
                
            </div>

            <Button label="Contact us" icon="pi pi-user" className="w-full" />
        </div>
    </div>
</div>
    
<div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap" style={{ marginTop:"10px" }}>
    <div className="font-bold mr-8">🔥 Book Store</div>
    <div className="align-items-center hidden lg:flex">
        <span className="line-height-3">Copyright © 2023 ABC Books. All rights reserved.</span>
    </div>
    
    
</div>
</>
  );
};