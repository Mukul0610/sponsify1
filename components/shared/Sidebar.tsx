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
                    <p className="font-extrabold text-2xl">SPON<span className="text-red-600">SIFY</span></p>
                    </Link>

                    <nav className='sidebar-nav'>
                        <SignedIn>
                            <ul className='sidebar-nav_elements'>
                                {navLinks.map((link) => {
                                    const isActive = link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group ${isActive ? ' bg-gray-400 ' : 'text-gray-700'
                                            }`}><Link className='sidebar-link' href={link.route}>
                                                <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                                <li className='flex-center cursor-pointer gap-2 p-4'>
                                    <UserButton afterSignOutUrl='/' showName/>
                                </li>
                            </ul>
                        </SignedIn>

                        <SignedOut>
                            <Button asChild className='button bg-gray-gradient bg-black'>
                                <Link href='/sign-in'>
                                    Login
                                </Link>
                            </Button>
                        </SignedOut>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar