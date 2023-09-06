import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import { FaBackward } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


const Reports = () => {
    const authState = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [search,setSearch] = useState("");
    const [data,setData] = useState([]);
    const [total,setTotal] = useState();
  
    useEffect(()=>{
        if(!authState.isLogged || authState.role !== "admin") navigate('/');
        if(data.length>0){
          const handleTotal = ()=>{
            let sum  =0;
             data.forEach((item)=>{
               sum += parseInt(item.amount);
            }) 
             setTotal(sum);
           }
          handleTotal();
        }
    },[authState.isLogged,authState.role,navigate,data]);
    const tableFields = [
        {
         id:1,
         title:"Username"
       },
       {
         id:2,
         title:"Vendor Name"
       },
       {
        id:3,
        title:"File"
       },{
        id:4,
        title:"Amount"
       }
    ]
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
            <h1 className='mt-11 mb-5 text-center text-brandColor text-4xl font-semibold font-poppins'>Reports</h1>
            <div className='w-[650px] flex justify-end mx-auto'>
      <Link to="/dashboard" className='px-4 py-2 cursor-pointer rounded-lg shadow'>
      <FaBackward className='text-brandColor'/>
      </Link>
    </div>
            <SearchBar search={search} setSearch={setSearch} store={setData}/>
            <div>
              <p className='text-md text-red-500 font-poppins text-center '>*the report will be shown for <b>Approve</b> status only</p>
            </div>
            {
              data.length > 0 ? (
                <>
                <table className="border w-[1200px]  mx-auto mt-12 border-gray-300">
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
                  {data.map((item)=>(
                      <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
                      <td className='border border-gray-300 p-2 text-center'>{item.username}</td>
                      <td className='border border-gray-300 p-2 text-center'>{item.vendor}</td>
                      <td className='border border-gray-300 p-2 text-center'> 
                      <div className='justify-center flex '>
                        <button onClick={()=>handleDownload(item.file)} className='px-4 py-2 rounded-md shadow bg-blue-300 text-white mx'>Download</button>
                      </div>
                      </td>
                      <td className='border border-gray-300 p-2 text-center'>{item.amount}</td>
                      
                      </tr>
                  ))}
                  </tbody>
                  </table>
                  <div className='flex my-7  justify-center items-center'>
                    <h1 className='px-6 py-3 rounded-lg shadow-lg font-poppins ring font-semibold text-brandColor f'>Total Amount : <span className='text-red-500'>{total}</span></h1>
                  </div>
                  </>
              ) : ( <h1 className="text-3xl font-semibold text-center font-poppins text-brandColor">Empty 🙄</h1>)
            }
    </div>
  )
}

export default Reports