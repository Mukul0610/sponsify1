'use client'

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div>
            <aside className='sidebar'>
                <div className='flex size-full flex-col gap-4'>
                    <Link href='/' className='sidebar-logo'>
                    <p className="font-extrabold text-3xl ml-1">SPON<span className="text-red-600">SIFY</span></p>
                    </Link>

                    <nav className='sidebar-nav'>
                        
                            <ul className='sidebar-nav_elements'>
                                {navLinks.map((link) => {
                                    const isActive = link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group ${isActive ? ' bg-stone-500 ' : 'text-neutral-800'
                                            }`}><Link className='sidebar-link' href={link.route}>
                                                <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                                <li className='flex-center cursor-pointer gap-2'>
                                <Link href='/createcampaign' style={{ textDecoration: 'none'  }}><button className='mt-4 h-12 w-60 bg-neutral-700 text-slate-200 font-semibold text-base rounded-full   hover:bg-black hover:text-gray-100 cursor-pointer'>+ Create Campaign </button></Link>
                                </li>
                                <li className='flex-center cursor-pointer gap-2 p-4'>
                                    <UserButton afterSignOutUrl='/' showName/>
                                </li>
                            </ul>
                    

                        
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar