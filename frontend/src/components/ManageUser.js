import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import NavToCreate from './NavToCreate'
import ModalsCust from './ModalsCust'
import ManageView from './ManageView'

const ManageUser = () => {
    const authState = useSelector((state)=>state.auth);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        if(!authState.isLogged || authState.role !== "admin") navigate('/');
        
      },[authState.isLogged,authState.role,navigate])
    
      const handleOpen = () => {
        setOpen(true);
      }
      return (
    <div>
    <Navbar flag={false}/>
    <h1 className='mt-11 text-center text-brandColor text-4xl font-semibold font-poppins'>Manage Users</h1>
    <div className='w-[650px] flex justify-end mx-auto'>
      <Link to="/dashboard" className='px-4 py-2 cursor-pointer rounded-lg shadow'>
      <FaBackward className='text-brandColor'/>
      </Link>
    </div>
    
    <NavToCreate title="List of Users" to="" item="Users" handle={handleOpen}/>
    
    <ModalsCust open={open} setOpen={setOpen} title="create" flag={false} />
    <div>
      <ManageView refreshing={open} handleOpen={handleOpen}/>
    </div>
    </div>
  )
}

export default ManageUser