import React from 'react'
import userImg from '../../images/group.png'
import report from '../../images/analytics.png'
import invoice from '../../images/invoice.png'
import { Link } from 'react-router-dom'
const AdminFeatures = () => {
  const data = [{
    id:1,
    background:"bg-green-300",
    img:userImg,
    title:"Manage Users",
    path:'/dashboard/manage'
  },
  {
    id:2,
    background:"bg-pink-300",
    img:report,
    title:"Reports",
    path:'/dashboard/reports'
  },
  {
    id:3,
    background:"bg-blue-300",
    img:invoice,
    title:"Invoices",
    path:'/dashboard/invoices'
  },
]
    return (
    <div className='flex justify-evenly items-center gap-3 flex-wrap my-9 p-3 flex-grow'>
        {
            data.map((item)=>(
                <Link to={item.path} key={item.id} className={`flex transition-all hover:scale-105 cursor-pointer shadow-lg justify-around items-center w-[350px] h-[150px] ${item.background} p-5 rounded-lg`}>
            <div className='w-[100px]'>
                <img src={item.img} alt="icon" />
            </div>
            <div className='flex flex-col space-y-3 justify-center items-center'>
                <h1 className='font-poppins font-semibold text-2xl'>{item.title}</h1>
            </div>
        </Link>
            ))
        }
    </div>
  )
}

export default AdminFeatures