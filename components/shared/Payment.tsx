"use client"

import React from 'react'

const Payment = () => {
  return (
    
      <div className='flex gap-4 mr-16 justify-center'>
              <button type="button" className='font-bold bg-green-600 text-dark-600 px-6 py-4 rounded-lg m-2 text-white' onClick={()=>alert("Sorry, but this functionality is blocked since it is in testing mode")} >Add Credit</button>
              <button type="button" className='font-bold bg-blue-600 text-dark-600 px-6 py-4 rounded-lg m-2 text-white' onClick={()=>alert("Sorry, but this functionality is blocked since it is in testing mode")}>Withdrow</button>
            </div>
    
    
  )
}

export default Payment
