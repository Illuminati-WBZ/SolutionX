import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/reducers/AuthReducer'
const Navbar = ({flag = true,title="Login",to="login"}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.storeAuth({username:'',password:'',role:'',isLogged:false}));
    // remove the cookie
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
  return (
    <div className='flex justify-around mt-4 items-center'>
        <Link to="/" className='flex justify-center space-x-2 items-center'>
            <img src={logo} className='w-[60px]' alt="brand logo"/>
            <h2 className='font-satisfy font-semibold text-brandColor text-4xl'>SolutionX</h2>
        </Link>
        <div className=''>
          {
           flag ? (
             <Link to={to} className='px-8 py-2 rounded-md text-gray-800 font-semibold hover:bg-teal-500 hover:text-white ring-gray-500 hover:ring-teal-600 border-none ring-1 transition-all ease-in duration-200 shadow-md active:ring-4'>{title}</Link>
             ):(
              <button className='px-8 py-2 rounded-md text-gray-800 font-semibold hover:bg-red-500 hover:text-white ring-gray-500 hover:ring-red-500 border-none ring-1 transition-all ease-in duration-200 shadow-md active:ring-4' onClick={handleLogout}>Logout</button>
             ) 
            }
        </div>
    </div>
  )
}

export default Navbar