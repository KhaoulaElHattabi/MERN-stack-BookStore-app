import React,{useState} from "react";
import Navbar from "./Navbar";

import FileBase64 from 'react-file-base64';
export default function AboutUs(){
    const [base64String, setBase64String] = useState('');

  const handleFileUpload = (file) => {
    setBase64String(file.base64);
  };
    return(
        <>
        <Navbar/>
        <div className="pg-not-fd">About Us</div>
        <div>
      <FileBase64
        multiple={false}
        onDone={handleFileUpload}
      />
      <p>Base64 string: {base64String}</p>
    </div>
        </>
    )
}