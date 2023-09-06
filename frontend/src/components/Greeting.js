import React from 'react'

const Greeting = ({name}) => {
  return (
        <div className="font-poppins mt-16 text-4xl font-semibold text-brandColor flex items-center mx-11 justify-evenly">
            <div className='flex items-center'>
            <h1>Hi </h1>
            <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" 
             alt="hand-wave gif" className="mb-3 mx-2 w-[50px]"/>
            <h1 className='capitalize'>{name}</h1>
             </div>
        </div>
  )
}

export default Greeting