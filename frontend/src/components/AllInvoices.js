import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { notify } from '../notification';
import { FaBackward,FaPaperPlane,FaQuestion } from "react-icons/fa";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {authToken} from '../auth-token';

const AllInvoices = () => {
    const [showInvoice,setShowInvoice] = useState([])
    const authState = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [refresh,setRefresh] = useState(false);
    useEffect(()=>{
      if(!authState.isLogged || authState.role !== "admin") navigate('/');
      const getAllInvoices = async () => {
            try{
                const res = await axios.get('https://localhost:7289/api/invoices',authToken());
                const {data} = await res; 
                setShowInvoice(data);
            }catch(err){
                notify("error");
                console.log(err);
            }
      }
      getAllInvoices();
      
      
    },[authState.isLogged,navigate,authState.role,refresh])
    const tableFields = [
        {
            id:1,
            title:"Username"
        }
        ,
        {
         id:2,
         title:"File"
       },
       {
         id:3,
         title:"Vendor"
       },
       {
         id:4,
         title:"Issued Date"
       },{
         id:5,
         title:"Due Date"
       },{
         id:6,
         title:"Amount"
       },{
         id:7,
         title:"Status"
       },{
        id:8,
        title:"Request At"
       },{
        id:9,
        title:"Operation"
       }
     ]
     
     const handleNewVendor = async(id) =>{
        const res = window.confirm("Want to Approve Vendor?");
        if(res){
          try{

            const res = await axios.get(`https://localhost:7289/api/invoices/id/${id}`,authToken());
            const data = await res.data;
            data.existingVendor = true;
            
            const update = await axios.put(`https://localhost:7289/api/invoices/id/${id}`,data,authToken());
            console.log(update);

            //add the vendor
            const newVendor = await axios.post("https://localhost:7289/api/vendors",{username:data.vendor},authToken())
            console.log(newVendor);
            notify("success","New Vendor Approved");
            setRefresh(true);
          }catch(err){

          }
        }
     }

     const fetchFileExtension = (file) => {
      return file.substring(file.indexOf('/')+1,file.indexOf(';'));
  }
  const handleDownload = (file) => {
    const ext = fetchFileExtension(file);
    const linkSource = file;
    const downloadLink = document.createElement("a");
    const fileName = `${uuidv4()}.${ext}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <div>
        <Navbar flag={false}/>
        <h1 className='mt-11 text-center text-brandColor text-4xl font-semibold font-poppins'>Invoices</h1>
        <div className='w-[650px] flex justify-end mx-auto'>
          <Link to="/dashboard" className='px-4 py-2 cursor-pointer rounded-lg shadow'>
          <FaBackward className='text-brandColor'/>
          </Link>
        </div>
        <div className='flex justify-center items-center'>
    <div className="lg:w-[1210px] md:w-[650px] sm:w-[550px] w-[450px] mx-8 p-4 border-2 border-brandColor rounded-md my-3">
    <h5 className="font-roboto text-gray-500 font-semibold text-xl mb-5">Invoices list</h5>
    <div className="overflow-auto">
        {
            showInvoice.length>0 ? (
                <table className="border w-full border-gray-300">
            <thead>
                <tr className="font-roboto text-center">
                    {
                        tableFields.map((item)=>(
                    <th key={item.id} className='border border-gray-300 p-2'>{item.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="text-gray-400">
                {showInvoice.map((item)=>{
                  if(item.status === "In Progress"){
                    return (
                      
                      <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
                        <td className='border border-gray-300 p-2 text-center'>{item.username}</td>
                        <td className='border border-gray-300 p-2'>
                          {/* <Gallery>
                            <div className='cursor-pointer flex justify-center'>
                            <Item
                              original={item.file}
                            >
                              {({ ref, open }) => (
                                <img ref={ref} className='w-[90px]' onClick={open} src={item.file} alt="file"/>
                              )}
                            </Item>
                            </div>
                          </Gallery> */}
             <div className='justify-center flex '>
                        <button onClick={()=>handleDownload(item.file)} className='px-4 py-2 rounded-md shadow bg-blue-300 text-white mx'>Download</button>
                        </div>
                        </td>
                        <td className='border border-gray-300 p-2'>{ item.existingVendor ? (<h2 className='text-center'>{item.vendor}</h2>):(<div className='flex justify-center items-center space-x-3'>
                          <h2>{item.vendor}</h2>
                          <span onClick={()=>handleNewVendor(item.id)} className='px-4 py-2 cursor-pointer shadow-md rounded-lg'><FaQuestion title="New Vendor"/></span>
                        </div>) }</td>
                        <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                        <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                        <td className='border border-gray-300 p-2'>{item.amount}</td>
                         <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-pink-600 bg-pink-300 shadow-md rounded-md text-center  mx-auto'>{item.status} </p>    </td>
                         <td title={item.requestAt} className='border border-gray-300 p-2'>{item.requestAt.substring(0,10)}</td>
                         <td className='border border-gray-300 p-2'>
                            <div className='flex justify-center' title={!item.existingVendor&&("First Approve Vendor")}>
                            <Link to={`/dashboard/invoices/status/${item.id}`}  className={"px-4 py-2 rounded-lg shadow-md" + (item.existingVendor ? ' cursor-pointer':' pointer-events-none' ) } >
                            <FaPaperPlane className='text-lg text-blue-500'/>
                            </Link>
                            </div>
                         </td>
                    </tr>
                )
              } else  if(item.status === "Voided"){
                return (
                  
                  <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
                    <td className='border border-gray-300 p-2 text-center'>{item.username}</td>
                                          <td className='border border-gray-300 p-2'>
                          {/* <Gallery>
                            <div className='cursor-pointer flex justify-center'>
                            <Item
                              original={item.file}
                            >
                              {({ ref, open }) => (
                                <img ref={ref} className='w-[90px]' onClick={open} src={item.file} alt="file"/>
                              )}
                            </Item>
                            </div>
                          </Gallery> */}

<div className='justify-center flex '>
                        <button onClick={()=>handleDownload(item.file)} className='px-4 py-2 rounded-md shadow bg-blue-300 text-white mx'>Download</button>
                        </div>

                        </td>
                        <td className='border border-gray-300 p-2'>{ item.existingVendor ? (<h2 className='text-center'>{item.vendor}</h2>):(<div className='flex justify-center items-center space-x-3'>
                          <h2>{item.vendor}</h2>
                          <span onClick={()=>handleNewVendor(item.id)} className='px-4 py-2 cursor-pointer shadow-md rounded-lg'><FaQuestion title="New Vendor"/></span>
                        </div>) }</td>
                    <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.amount}</td>
                     <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-purple-600 bg-purple-300 shadow-md rounded-md text-center  mx-auto'>{item.status} </p>    </td>
                     <td title={item.requestAt} className='border border-gray-300 p-2'>{item.requestAt.substring(0,10)}</td>
                     <td className='border border-gray-300 p-2'>
                            <div className='flex justify-center' title={!item.existingVendor&&("First Approve Vendor")}>
                            <Link to={`/dashboard/invoices/status/${item.id}`}  className={" px-4 py-2 rounded-lg shadow-md" + (item.existingVendor ? ' cursor-pointer':' pointer-events-none' ) } >
                            <FaPaperPlane className='text-lg text-blue-500'/>
                            </Link>
                            </div>
                         </td>
                </tr>
            )
              
              }else if(item.status === "Approve") {

                return (
                  
                  <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
                        <td className='border border-gray-300 p-2 text-center'>{item.username}</td>
                        <td className='border border-gray-300 p-2'>
                          {/* <Gallery>
                            <div className='cursor-pointer flex justify-center'>
                            <Item
                              original={item.file}
                            >
                              {({ ref, open }) => (
                                <img ref={ref} className='w-[90px]' onClick={open} src={item.file} alt="file"/>
                              )}
                            </Item>
                            </div>
                          </Gallery> */}

<div className='justify-center flex '>
                        <button onClick={()=>handleDownload(item.file)} className='px-4 py-2 rounded-md shadow bg-blue-300 text-white mx'>Download</button>
                        </div>
                        </td>
                        <td className='border border-gray-300 p-2'>{ item.existingVendor ? (<h2 className='text-center'>{item.vendor}</h2>):(<div className='flex justify-center items-center space-x-3'>
                          <h2>{item.vendor}</h2>
                          <span onClick={()=>handleNewVendor(item.id)} className='px-4 py-2 cursor-pointer shadow-md rounded-lg'><FaQuestion title="New Vendor"/></span>
                        </div>) }</td>
                    <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.amount}</td>
                     <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-teal-600 bg-teal-300 shadow-md rounded-md text-center  mx-auto'>{item.status} </p>    </td>
                     <td title={item.requestAt}className='border border-gray-300 p-2'>{item.requestAt.substring(0,10)}</td>
                     <td className='border border-gray-300 p-2'>
                            <div className='flex justify-center' title={!item.existingVendor&&("First Approve Vendor")}>
                            <Link to={`/dashboard/invoices/status/${item.id}`} className={" px-4 py-2 rounded-lg shadow-md" + (item.existingVendor ? ' cursor-pointer':' pointer-events-none' ) } >
                            <FaPaperPlane className='text-lg text-blue-500'/>
                            </Link>
                            </div>
                         </td>
                </tr>
            )

              }
            
                })}
            </tbody>
        </table>
            ):(
                <h1 className="text-3xl font-semibold font-poppins text-brandColor">Empty 🙄</h1>
            ) 
        }
    </div>
    {/* error */}
    {/* <div id="error" className="container justify-content-center flex-column align-items-center">
        <h1 className="brand-color font-pop">Nothing Found, Check The Name Again 🙄</h1>
    </div> */}
</div>
<ToastContainer/>
</div>

    </div>
  )
}

export default AllInvoices