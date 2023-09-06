import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import avatar from '../images/man.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/reducers/AuthReducer'
import { notify } from '../notification'
import { ToastContainer,} from 'react-toastify';
import jwt_decode from "jwt-decode";
const Login = () => {
  const authState = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(authState.isLogged) navigate('/dashboard');
    
  },[authState.isLogged,navigate])
  // dispatch
  const dispatch = useDispatch();
  const [loginData,setLoginData] = useState({email:'',password:''});
  const data = [{
    id:1,
    title:"Email Address",
    placeholder:"Enter Your Email Address",
    type:"email",
    name:"email",
    value:loginData.email
  },{
    id:2,
    title:"Password",
    placeholder:"Enter Your Password",
    type:"password",
    name:"password",
    value:loginData.password
  }]

  const handleChange = (e) => {
    const {name,value} = e.target;
    
    setLoginData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const verifyAuth = async ()=>{
      try{
         const res = await axios.post("https://localhost:7289/api/login",loginData)
         const token = await res.data;
          const obj = jwt_decode(token);
          // console.log(obj);
          // create or override the token and insert to cookie
          document.cookie = `token=${token};expires=${new Date(obj.exp*1000).toUTCString()};path=/;`;
          dispatch(authActions.storeAuth({username:obj.username,role:obj.role,isLogged:true}));
          console.log(document.cookie);
      }catch(err){
        if(err.message.includes("401")){
          notify("wrong");
        }else
        notify("error");
        console.log(err);
      }
    }
    verifyAuth();
  }

  return (
    <div className='h-screen'>
       <div className='flex mt-11 justify-center space-x-2 items-center'>
            <img src={logo} className='w-[60px]' alt="brand logo"/>
            <h2 className='font-satisfy font-semibold text-brandColor text-4xl'>SolutionX</h2>
        </div>
        <div className='flex w-[650px] mx-auto mt-11 flex-col items-center'>
          <div className='flex flex-col items-center space-y-5'>
          <img className='w-[60px]' src={avatar} alt="avatar" />
          <p className='text-brandColor font-roboto font-semibold text-3xl'>Login Service</p>
          
          </div>
          <form action="" className='mt-11 flex flex-col font-roboto space-y-3 w-[500px]' onSubmit={handleSubmit}>
            {
              data.map((item)=>(
                <div key={item.id} className='flex flex-col space-y-3'>
              <h1 className='text-xl font-semibold text-brandColor'>{item.title}</h1>
              <input type={item.type} name={item.name} value={item.value}  className='ring-2 focus:ring-sky-600 ring-teal-600 outline-none border-none rounded-full w-full py-2 px-4'  placeholder={item.placeholder} required onChange={handleChange}/>
            </div>
              ))
            }
            <button className='w-[150px] px-4 py-2 bg-[#419E95] mt-4 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-200 ease-in-out hover:scale-105'>Login</button>

          </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login