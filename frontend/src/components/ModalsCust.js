import React,{useEffect, useState} from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios'
import { notify } from '../notification'
import {authToken} from '../auth-token';
const ModalsCust = ({open,setOpen,title,flag,uuid="",setId={}}) => {
    const onCloseModal = () => setOpen(false);
    const [user,setUser] = useState({username:'',email:'',password:''});
    const data = [{
        id:1,
        title:"Username",
        type:"text",
        placeholder:"Enter Your Username",
        name:"username",
        value:user?.username
    },
    {
        id:2,
        title:"Email Address",
        type:"email",
        placeholder:"Enter Your Email Address",
        name:"email",
        value:user?.email
    },
    {
        id:3,
        title:"Password",
        type:"password",
        placeholder:"Enter Your password",
        name:"password",
        value:user?.password
    },

]
    useEffect(()=>{
     if(flag){
        const getUser = async ()=>{
            try{
              console.log(uuid);
                const res = await axios.get(`https://localhost:7289/api/users/id/${uuid}`,authToken());
                const data = await res.data;
                setUser(data);
            }catch(err){
              notify(err);console.log(err);
            }
        }
        getUser();
     } 
    },[flag,uuid])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          if(!flag){
            const data = await axios.post("https://localhost:7289/api/create/users",user,authToken());
            console.log(data);
          }else{
            const res = await axios.put(`https://localhost:7289/api/users/id/${uuid}`,user,authToken());
            setId("");
            console.log(res);
          }
          notify("success",`successfully ${title}d!`);
          onCloseModal();
      
        }catch(err){
          console.log(err);
          notify("error");
        }
      }
      const handleChange = (e) => {
        const {name,value} = e.target;
        setUser((prev)=>{return{...prev,[name]:value}})
      }
  return (
    <div>
         <Modal open={open} onClose={onCloseModal} center>
      <h2 className='text-2xl capitalize text-center mt-3 text-brandColor font-semibold font-poppins'>{title}</h2>
       <form onSubmit={handleSubmit} className='mt-16'>
      {
        data.map((item)=>(
            <div key={item.id} className='p-5 flex flex-col space-y-3'>
            <label htmlFor="" className='font-semibold text-xl font-poppins text-blue-500'>{item.title}</label>
            <input className='p-2 ring border-none ring-blue-400 text-lg outline-none rounded-md' type={item.type} placeholder={item.placeholder} value={item.value} name={item.name} required onChange={handleChange}/>
        </div>
        ))
      }
      <div className='flex justify-center items-center'>
          <button className='w-[150px]  px-4 py-2 bg-[#419E95] mt-4 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-200 ease-in-out hover:scale-105'>Create</button>
      </div>
        </form>
    </Modal>
    <ToastContainer/>
    </div>
  )
}

export default ModalsCust