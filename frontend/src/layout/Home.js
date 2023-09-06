import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Footer from '../components/home/Footer'
import { useSelector } from 'react-redux'

const Home = () => {
  const authState = useSelector((state)=>state.auth);
  const [flag,setFlag] = useState(false);
  useEffect(()=>{
    if(authState.isLogged)setFlag(true);
  },[authState.isLogged]);
  return (
    <>
    {
      flag ? (<Navbar title="Open Dashboard" to="/dashboard"/>) : (<Navbar/>)
    }
    <Hero/>
    <Features/>
    <Footer/>
    </>
  )
}

export default Home