import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
const NavToCreate = ({title,to="",item,handle=""}) => {
  const navigate = useNavigate();
  const popup = ()=>{
    if(handle!==""){
      handle();
    }
    if(to !== "")navigate(to);
  }
  return (
    <div className="flex  p-4 justify-around mt-10 items-center ">
    <h3 className="font-roboto text-brandColor text-4xl">{title}</h3>
    <button onClick={popup}  className="active:ring drop-shadow-md rounded-full flex items-center transition-all duration-300 ease-in-out hover:bg-brandColor hover:text-white bg-[#e3f1fb]  hover:scale-105 space-x-3 px-5 py-2">
        <FaPlus className='text-[#03C6C7]'/>
        <span className="font-roboto  font-medium">Add {item}</span>
    </button>
</div>
  )
}

export default NavToCreate