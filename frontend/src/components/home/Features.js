import React from 'react'
import time from '../../images/fast-time.png'
import instantOverview from '../../images/validating-ticket.png'
import invoice from '../../images/invoicemsg.png'
const Features = () => {
    const data = [{
            id:1,
            img:time,
            headline:"Know when an invoice is opened",
            subHeadline:"if its not opened within 48 hours we'll send a paper version"
    },
    {
        id:2,
        img:instantOverview,
        headline:"Instant Overview",
        subHeadline:"Instant overview of the invoice get all the update instantly"
},
{
    id:3,
    img:invoice,
    headline:"Communicate directly via the invoice",
    subHeadline:"communicate directly with status showing in dashboard"
},

]
  return (
    <div className='bg-gray-50 p-5'>
        <div className='my-3'>
                <p className='text-base font-poppins font-semibold text-brandColor text-center'>Discover the joys of a web-based billing application that has been built from the group up to be user-friendly, flexible and always available</p>
                <div className='flex justify-between p-4 sm:justify-center mt-6 items-center flex-wrap gap-10'>
                {
                    data.map((item)=>(
                        <div key={item.id} className='flex space-x-6 justify-evenly items-center'>
                    <div>
                        <img src={item.img} className='w-[100px]' alt="icon" />
                    </div>
                    <div>
                        <p className='text-xl font-semibold text-brandColor '>{item.headline}</p>
                        <p className='text-gray-600 mt-2'>{item.subHeadline}</p>
                    </div>
                </div>
                    ))
                }
                </div>
        </div>
    </div>
  )
}

export default Features