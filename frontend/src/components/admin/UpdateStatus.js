import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { notify } from '../../notification';
import { ToastContainer,} from 'react-toastify';
import { FaBackward } from 'react-icons/fa';
import { authToken } from '../../auth-token';


const UpdateStatus = () => {
    const [invoiceStatus,setInvoiceStatus] = useState({})
    const authState = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const url = useParams();
    useEffect(()=>{
      if(!authState.isLogged || authState.role !== "admin") navigate('/');
      const getAllInvoices = async () => {
            try{
                const res = await axios.get(`https://localhost:7289/api/invoices/id/${url.id}`,authToken());
                const {data} = await res; 
                setInvoiceStatus(data);
            }catch(err){
                notify("error");
                console.log(err);
            }
      }
      getAllInvoices();
      
    },[authState.isLogged,navigate,authState.role,url.id])
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setInvoiceStatus((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const handleUpdate = async () => {
        try{
            const res = await axios.put(`https://localhost:7289/api/invoices/id/${invoiceStatus.id}`,invoiceStatus,authToken());
            console.log(res);
            notify("success","Status Update Successfully")
        }catch(err){   
            notify("error");
            console.log(err);
        }
    }
  return (
    <div>
        <Navbar/>
        <h1 className='mt-11 text-center text-brandColor text-4xl font-semibold font-poppins'>Update Status</h1>
        <div className='w-[650px] flex justify-end mx-auto'>
          <Link to="/dashboard/invoices" className='px-4 py-2 cursor-pointer rounded-lg shadow'>
          <FaBackward className='text-brandColor'/>
          </Link>
        </div>
        <div className='justify-center mt-16 flex flex-col items-center space-y-8'>
        <select className='border-2 w-[50%] text-xl shadow-lg rounded-lg bg-sky-400 text-white p-5' name="status" value={invoiceStatus.status} onChange={handleChange}>
        <option value="In Progress">In Progress</option>
        <option value="Voided">Voided</option>
        <option value="Approve">Approve</option>
        </select>
        <button onClick={handleUpdate} className='px-4 py-2 w-[150px] mx-auto rounded-full self-start shadow-lg bg-slate-300 text-brandColor transition-all hover:scale-105 duration-200 hover:bg-teal-400 hover:text-white'>Submit</button>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default UpdateStatus