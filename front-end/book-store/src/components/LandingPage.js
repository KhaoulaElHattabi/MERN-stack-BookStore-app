
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import Navbar from './Navbar';
import ProductService from '../services/bookService';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import myImage from '../assets/couverture.jpg';
import { useNavigate,  } from 'react-router-dom';
export default function BasicDemo() {
    const navig=useNavigate()
    const nav=()=>{
        const dataa = window.localStorage.getItem("user");
        if (dataa) {
          const parsedData = JSON.parse(dataa);
          var role = parsedData.data.role;
          
        } else {
          console.log('Data not found in local storage.');
        } 
              if (role == "admin"){
                navig("/admin")
               // console.log("Admin :"+shouldHide)
              }
              else if(role == "user")
              {
                navig("/user")
               // console.log("user :"+shouldHide)
              }
              else
              {
                navig("/login")
              }
    }
    
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    async function getBooks() {
    
        const result = await ProductService.getAllBooks();
        setProducts(result.data);
        //console.log(result)
      }
      useEffect(() => {
        getBooks();
      }, []);
    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    useEffect(() => {
        
    }, []);

    const productTemplate = (product) => {
        return (
            
            <div className="border-0 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                <img src={product.image} alt={product.name} className="w-6 shadow-2" style={{height: "300px",width:"200px",margin:"auto"}}/>
                </div>
                <div >
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">{product.category.name}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    <div className=" justify-content-center"style={{ margin:"auto" }}>
                        <Button icon="pi pi-search" className="p-button p-button-rounded"style={{margin:"auto",marginRight:"5px"}} onClick={() => nav()}/>
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    return (

        <>
         <Navbar />
<div className="grid grid-nogutter surface-0 text-800">
    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span className="block text-6xl font-bold mb-1">Explore a world of stories</span>
            <div className="text-6xl text-primary font-bold mb-3">at LITERARY CORNER</div>
            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <Button label="Get More" type="button" className="mr-3 p-button-raised"  onClick={() => nav()} />
           
        </section>
    </div>
    <div className="col-12 md:col-6 overflow-hidden">
        <img src="https://www.parliament.uk/contentassets/aa8b9933d3cb4364b827e7a60ea898e0/hl_library_roger-harris2022.jpg" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
    </div>
</div>
    

        <div className="card" >
            <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        
{/* <div className="flex align-items-center justify-content-center" style={{ marginTop:"10px",marginBottom:"10px" }}>
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />

            <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div>

            <Button label="Sign In" icon="pi pi-user" className="w-full" />
        </div>
    </div>
</div> */}
    
  
<div className="surface-0 text-center"style={{ margin:"10px"}} >
    <div className="mb-3 font-bold text-3xl"> 
        <span className="text-900">One book </span>
        <span className="text-blue-600">Endless possibilities</span>
    </div>
    <div className="text-700 mb-6">Explore new worlds, gain new knowledge, and be entertained for hours with just one purchase.</div>
    <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Accessibility 24/7</div>
            <span className="text-700 line-height-3">Discover your next favorite book at our store - we offer a diverse selection of titles for every reader. Shop in-store or online 24/7.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
            <span className="text-700 line-height-3">Protect your data with end-to-end encryption, the highest level of security available. Our platform ensures that your information stays private and secure, from upload to download.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span className="text-700 line-height-3">Our platform is designed to be easy to use, with a simple and intuitive interface. Whether you're a novice or an experienced user, you'll find it a breeze to navigate and find what you're looking for.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
            <span className="text-700 line-height-3">Get fast and reliable support from anywhere in the world. Our global team is available 24/7 to assist you with any questions or issues.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-download text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Download</div>
            <span className="text-700 line-height-3">Download your favorite book instantly, hassle-free. Our platform offers fast and easy access to thousands of titles, available for download anytime, anywhere. </span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-shield text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
            <span className="text-700 line-height-3">Shop with peace of mind knowing that your security is our top priority. Our advanced security measures and encryption technologies ensure that your personal and financial information is always safe and secure.</span>
        </div>
    </div>
</div>
          
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
    )
}
        