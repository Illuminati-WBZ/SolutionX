import React from 'react'
import logo from '../../images/logo.png'
import { FaFacebookSquare,FaTwitter,FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const handleHref = () =>{
        window.location.href = "https://in.linkedin.com/in/pruthvitirmal"
    }
    const data = [{
        id:1,
        tag:<FaFacebookSquare/>
    },{
        id:2,
        tag:<FaTwitter/>
    },{
        id:3,
        tag:<FaLinkedinIn/>
    },]
  return (
    <div className='bg-slate-100 py-5'>
        <div className='flex justify-center space-x-2 items-center'>
            <img src={logo} className='w-[60px]' alt="logo icon" />
            <h2 className='font-satisfy font-semibold text-brandColor text-4xl'>SolutionX</h2>
        </div>
        <div className='flex justify-center text-brandColor text-2xl items-center space-x-5 mt-4'>
            {
                data.map((item)=>{
                    return (
                        <div key={item.id}>
                        {item.tag}
                    </div>
                        )
                })
            }
        </div>
        <div className='flex items-center flex-col mt-4 space-y-3'>
            <h1 onClick={handleHref}  className='cursor-pointer font-permanent-maker text-teal-600'>Design and Developed By Phoenix ⚡</h1>
            <p className='text-brandColor font-roboto'>&copy; all the rights are reserved</p>
        </div>
    </div>
  )
}

export default Footer