import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaPlus } from "react-icons/fa";
import {notify} from '../notification'; 
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,} from 'react-toastify';
import FileBase from 'react-filebase64';
import { FaBackward } from "react-icons/fa";
import { authToken } from '../auth-token';
const AddInvoice = () => {
  const [toggle,setToggle] = useState(true);
  const [claim,setClaim] = useState({
    username:'',
    file:'',
    vendor:'',
    issueDate:'',
    dueDate:'',
    amount:'',
    existingVendor:true
  })
  const [vendors,setVendors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    setClaim((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const authState = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(toggle === true){
      // console.log(toggle);
      setClaim((prev)=>{return{...prev,existingVendor:true}});
    }else {
      setClaim((prev)=>{return{...prev,existingVendor:false}});
    }
    if(!authState.isLogged){
      console.log("i am out");
      console.log(authState.isLogged);
      navigate('/');
    }
    setClaim((prev)=>{return{...prev,username:authState.username};})
      const getAllVendors = async () => {
        try{
            const res = await axios.get('https://localhost:7289/api/vendors',authToken());
            const data = res.data;
            setVendors(data);
            console.log(data);
        }catch(err){
          notify("error");
          console.log(err);
        }
      }
      getAllVendors();
  },[authState,authState.isLogged,navigate,authState.username,toggle]);
  const data = [{
    id:1,
    title:"Issue Date",
    name:'issueDate'
  },
  {
    id:2,
    title:"Due Date",
    name:"dueDate"
  }
];
const handleShow = ()=>{
  setToggle(!toggle);
  
}
const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const res = await axios.post('https://localhost:7289/api/invoices',claim,authToken());
    console.log(res);
    notify("success","Request Created");
    setClaim({
      username:"",
      file:"",
      vendor:"",
      issueDate:"",
      dueDate:"",
      amount:"",
      existingVendor:true
    })
    setToggle(true);
  }catch(err){
    notify("error");
          console.log(err);
  }
}
  return (
    <>
    <Navbar flag={false}/>
        <h1 className='mt-11 text-center text-brandColor text-4xl font-semibold font-poppins'>Claim Invoice</h1>
        <div className='w-[650px] flex justify-end mx-auto'>
          <Link to="/dashboard" className='px-4 py-2 cursor-pointer rounded-lg shadow'>
          <FaBackward className='text-brandColor'/>
          </Link>
        </div>
<form onSubmit={handleSubmit} className='flex flex-col w-[650px] mx-auto space-y-6 items-center my-10 '>
  <div className=" flex flex-col space-y-3 w-full">
   <label htmlFor="" className='text-2xl  font-semibold text-brandColor'>Upload File</label>
  <div className="border-brandColor rounded-md border-2 p-2">
  <FileBase
            type="file"
            name="file"
            value={claim.file}
            multiple={false}
            onDone={({ base64 }) =>
              setClaim((prev)=>{return{...prev,file:base64};})
            }
    />
  </div>
  </div>
  {/* toggle between buttons */}
  {
    toggle ? (<div className=" flex flex-col space-y-3 w-full">
    <label htmlFor="vendors" className='text-2xl  font-semibold text-brandColor'>Search Existing Vendor: </label>
    <input list="vendors" name="vendor" value={claim.vendor} type="text" placeholder='Search vendor name' className='border-brandColor border-2 p-2 rounded-md' onChange={handleChange} required/>
  <datalist id="vendors">
    {vendors.map((item)=>(
      <option key={item.id} value={item.username} name="vendor"  className='capitalize'>{item.username}</option>
    ))}
  </datalist>
      <div className='text-red-500 flex items-center w-full space-x-3 font-semibold'><span>*If Vendor doesn't exist</span> <button onClick={handleShow} className='px-5 transition-all hover:scale-105 duration-200 ease-in-out shadow-md bg-slate-700 rounded-lg py-1 text-white flex space-x-3 justify-center items-center'> <FaPlus className='text-teal-500'/> <span>Vendor</span> </button></div>
    </div>) : (<div className=" flex flex-col space-y-3 w-full">
    <label htmlFor="" className='text-2xl  font-semibold text-brandColor'>New Vendor Name</label>
    <input type="text" value={claim.vendor} name="vendor" onChange={handleChange} className='border-brandColor border-2 p-2 rounded-md' placeholder='Enter Vendor Name' required/>
    <div>
    <div className='text-red-500 flex items-center w-full space-x-3 font-semibold'><span>*If Vendor exists</span> <button onClick={handleShow} className='px-5 transition-all hover:scale-105 duration-200 ease-in-out shadow-md bg-slate-700 rounded-lg py-1 text-white flex space-x-3 justify-center items-center'>Click here </button></div>
    </div>
   </div>)
  }
  <div className='flex justify-around w-full items-center'>
  {
    data.map((item)=>(
      <div key={item.id} className='flex  flex-col items-center space-y-2'>
    <label htmlFor="" className='text-lg font-semibold text-brandColor'>{item.title}</label>
    <input type="date" value={claim[item.name]} name={item.name} className='border-brandColor w-[250px] border-2 p-2 rounded-md' required onChange={handleChange}/>
  </div>
    ))
  }
  </div>
  <div className=" flex flex-col space-y-3 w-full">
   <label htmlFor="" className='text-2xl  font-semibold text-brandColor'>Amount</label>
   <input type="text" value={claim.amount} name='amount' className='border-brandColor border-2 p-2 rounded-md' placeholder='Enter Amount' required onChange={handleChange}/>
  </div>
  <button type="submit" className='px-4 py-2 w-[150px] rounded-full self-start shadow-lg bg-slate-300 text-brandColor transition-all hover:scale-105 duration-200 hover:bg-teal-400 hover:text-white'>Submit</button>
</form>
<ToastContainer/>
    </>
  )
}

export default AddInvoice