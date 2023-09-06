import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Greeting from '../components/Greeting'
import NavToCreate from '../components/NavToCreate'
import SearchBar from '../components/SearchBar'
import View from '../components/View'
import AdminFeatures from '../components/admin/AdminFeatures'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [role,setRole] = useState(false);
  const [username,setUsername] = useState("");
  const authState = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!authState.isLogged) navigate('/');
    if(authState.role === "admin")setRole(true);
    else setRole(false);
    setUsername(authState.username);
  console.log(authState);
  },[authState,navigate])
  return (
    <div className='relative h-screen'>
    <Navbar flag={false}/>
    <Greeting name={username}/>
    {
      role&&<AdminFeatures/>
    }
    <NavToCreate title="Histories" to="create" item="Invoice"/>
    <View/>
    </div>
  )
}

export default Dashboard