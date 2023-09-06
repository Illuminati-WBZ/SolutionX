import React, { useEffect, useState } from 'react'
import { notify } from '../notification'
import { ToastContainer,} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { authToken } from '../auth-token';
const View = () => {
    const authState = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [showInvoice,setShowInvoice] = useState([{}])
    useEffect(()=>{
        if(!authState.isLogged) navigate('/');
        
        const getUserInvoiceData = async ()=>{
            try{
                const res = await axios.get(`https://localhost:7289/api/invoices/${authState.username}`,authToken());
                const data = await res.data;
                setShowInvoice(data);
                console.log(data);

                // notify("success","record loaded successfully")
            }catch(err){
                notify("error");
                console.log(err);
            }
        }
        getUserInvoiceData();

      },[authState.isLogged,navigate,authState.username])

 
      const tableFields = [
       {
        id:1,
        title:"File"
      },
      {
        id:2,
        title:"Vendor"
      },
      {
        id:3,
        title:"Issued Date"
      },{
        id:4,
        title:"Due Date"
      },{
        id:5,
        title:"Amount"
      },{
        id:6,
        title:"Status"
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
                        <td className='border border-gray-300 p-2'>{item.vendor}</td>
                        <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                        <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                        <td className='border border-gray-300 p-2'>{item.amount}</td>
                         <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-pink-600 bg-pink-300 shadow-md rounded-md text-center w-[50%] mx-auto'>{item.status} </p>    </td>
                    </tr>
                )
              } else  if(item.status === "Voided"){
                return (
                  
                  <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
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
                    <td className='border border-gray-300 p-2'>{item.vendor}</td>
                    <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.amount}</td>
                     <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-purple-600 bg-purple-300 shadow-md rounded-md text-center w-[50%] mx-auto'>{item.status} </p>    </td>
                </tr>
            )
              
              }else if(item.status === "Approve") {

                return (
                  
                  <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
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
                    <td className='border border-gray-300 p-2'>{item.vendor}</td>
                    <td className='border border-gray-300 p-2'>{item.issueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.dueDate}</td>
                    <td className='border border-gray-300 p-2'>{item.amount}</td>
                     <td className='border border-gray-300 p-2'> <p className='px-4 py-2 text-teal-600 bg-teal-300 shadow-md rounded-md text-center w-[50%] mx-auto'>{item.status} </p>    </td>
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
  )
}

export default View