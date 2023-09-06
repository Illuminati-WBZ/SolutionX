import React from 'react'
import poster from '../../images/headImg.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='mt-20 flex justify-evenly space-x-10 p-4 items-center'>
      <div className='lg:w-[450px] w-[400px] '>
        <img src={poster} alt="poster"/>
      </div>
      <div className='flex flex-col space-y-5 lg:w-[40%] md:w-[50%] w-[60%] p-4 items-start'>
        <h1 className='lg:text-5xl  text-3xl font-semibold text-teal-500  font-poppins '>Simple, Beautiful and Powerful invoicing system</h1>
        <p className='font-roboto text-gray-500 lg:text-2xl'>Invoice your customers nicely, easily and quickly directly from the browser</p>
        <Link to="/login" className='px-5 py-2 active:ring-2 ring-brandColor rounded-md bg-brandColor text-white'>GET STARTED</Link>
      </div>
    </div>
  )
}

export default Hero