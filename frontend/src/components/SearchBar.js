import React from 'react'
import { FaSearchengin } from "react-icons/fa";
import { notify } from '../notification';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { authToken } from '../auth-token';
const SearchBar = ({search="",setSearch={},store={}}) => {
  const handleEnter = (e)=>{
    if(e.key === 'Enter'){
      const getAllReports = async()=>{
        try{
          const res = await axios.get(`https://localhost:7289/api/invoices/${search}`,authToken());
          const data = await res.data;
          store(data);
          notify("success","Loaded Successfully!");
        }catch(err){
          notify(err);
          console.log(err);
        }
      }
      getAllReports();
    }
  }
  return (
    <div className='flex justify-center  items-center'>
    <div className="lg:w-[1210px] w-[650px] shadow-md mx-8 my-5 p-2 border-2 border-brandColor rounded-full flex justify-center items-center " >
        <FaSearchengin className='text-brandColor text-3xl mx-3'/>
<input onKeyUp={handleEnter} className="w-full placeholder:text-teal-500 tracking-wider border-none outline-none bg-transparent font-semibold font-roboto" value={search} onChange={(e)=>setSearch(e.target.value)} type="search"  id="" placeholder="Search (Its Case-Sensitive)" />
    </div>
    <ToastContainer/>
    </div>
  )
}

export default SearchBar