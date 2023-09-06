import React, { useEffect, useState } from 'react'
import { notify } from '../notification';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import ModalsCust from './ModalsCust';
import { authToken } from '../auth-token';
const ManageView = ({refreshing}) => {
    const [users,setUsers] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [uuid,setId] = useState("")
    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
      }
    useEffect(()=>{
        const getAllUser = async()=>{
            try{
                const res = await axios.get("https://localhost:7289/api/users",authToken());
                const data = await res.data;
                setUsers(data);
            }catch(err){
                notify("error");
            }
        }
        getAllUser();
    },[refresh,refreshing,uuid])
    const tableFields = [
        {
         id:1,
         title:"Username"
       },
       {
         id:2,
         title:"Email Address"
       },
       {
        id:3,
        title:"Operations"
       }
    ]
    const handleDelete = async (id) => {
        try{
            const data = await axios.delete(`https://localhost:7289/api/users/delete/${id}`,authToken())
            notify("success","Deleted Successfully");
            setRefresh(true);
        }catch(err){
            notify(err);
            console.log(err);
        }
    }
  return (
    <div className='max-w-[1200px] mt-10 mx-auto'>
          {
            users.length>0 ? (
                <table className="border w-full border-gray-300">
                <thead>
                <tr className="font-roboto text-center">
                    {
                        tableFields.map((item)=>(
                    <th key={item.id} className='border border-gray-300 p-2'>{item.title}   
                    </th>
                        ))
                    }
                </tr>
                </thead>
                 <tbody className="text-gray-400">
                    {users.map((item)=>(
                         <tr key={item.id} className='text-lg font-roboto text-brandColor border-2'>
                         <td className='border border-gray-300 p-2'>{item.username}
                            </td>
                            <td className='border border-gray-300 p-2'>{item.email}
                            </td>
                            <td className='border border-gray-300 p-2'>
                                <div className='flex justify-center space-x-5 items-center'>
                                    <button onClick={()=>handleOpen(item.id)} className='px-4 py-2 rounded-md shadow-md bg-blue-500 text-blue-200'>
                                        <FaEdit/>
                                    </button>
                                    <button onClick={()=>handleDelete(item.id)} className='px-4 py-2 shadow-md rounded-md bg-red-500 text-red-200'>
                                        <FaTrashAlt/>
                                    </button>
                                </div>
                            </td>
                            </tr>
                    ))}
                </tbody>
                </table>
            ) : ( <h1 className="text-3xl font-semibold font-poppins text-brandColor">"Empty 🙄"</h1>)
          }

        <ModalsCust open={open} setOpen={setOpen} title="update" flag={true} uuid={uuid} setId={setId}/>
          <ToastContainer/>
    </div>
  )
}

export default ManageView