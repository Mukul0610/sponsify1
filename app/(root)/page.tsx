import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
      <p className='flex-col text-inherit font-thin '>Home</p>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Home

