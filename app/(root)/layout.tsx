import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LandingPage from '@/components/shared/LandingPage';

const Layout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='root'>
      <SignedIn>
        <Sidebar />
        <MobileNav />
      </SignedIn>
      <SignedOut>
        <div className='min-h-screen flex bg-black text-white w-[100%]'>
        <LandingPage/>
        </div>
      </SignedOut>
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout
