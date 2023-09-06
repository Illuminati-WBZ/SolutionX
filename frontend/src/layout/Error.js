import React from 'react'
import {Link} from 'react-router-dom';
const Error = () => {
  
  return (
    <div className='relative h-screen'>
      <div className='absolute left-[50%] top-[50%] -translate-y-[50%] -z-10 -translate-x-[50%]'>
        <h1 className='text-gray-200 lg:text-[30rem] font-poppins font-bold md:text-[25rem] text-[12rem]'>404</h1>
      </div>
      <div className='flex flex-col items-center space-y-5 justify-center h-full '>
        <h1 className='font-poppins uppercase font-bold text-4xl'>we are sorry, page not found!</h1>
        <p className='font-roboto uppercase'>the page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
        <Link to="/" className='px-4 py-2 bg-sky-500 rounded-full text-white active:ring'>Back to Homepage</Link>
      </div>
    </div>
  )
}

export default Error