'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

const Navbar = () => {
    const pathname = usePathname()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const navLinks = [
        { name: 'Home', link: '/' },
        { name: 'Reaction', link: '/games/reaction' },
        { name: 'Sequence', link: '/games/sequence' },
        { name: 'Typing', link: '/games/typing' },
    ];

    const handleMobileNav = () => {
        setMobileNavOpen(!mobileNavOpen)
    }


  return (
    <>
        <nav className='h-[5rem] w-full bg-white py-2.5'>
            <div className='h-full flex flex-row items-center justify-between sm:px-18 px-8'>
                <div>
                <Link href='/'>
                    <span className='text-xl font-bold text-[#2B87D1] hover:text-[#78baf0] transition-colors ease-in-out duration-200'>BrainDash</span>
                </Link>
                </div>
                <ul className='hidden sm:flex flex-row items-center gap-10 text-gray-950 text-md font-semibold tracking-wide'>
                    {navLinks.map((item) => (
                        <li key={item.name} className={pathname === item.link ? 'text-[#2B87D1] hover:text-[#78baf0] transition-colors ease-in-out duration-200' : 'hover:text-gray-400 transition-colors ease-in-out duration-200'}>
                            <Link href={item.link}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <button 
                    className='sm:hidden flex items-center justify-center text-gray-950'
                    onClick={() => handleMobileNav()}
                >
                    <RxHamburgerMenu size={32} />
                </button>
            </div>
        </nav>
        {mobileNavOpen && (
            <MobileNav handleClose={handleMobileNav} navLinks={navLinks} />
        )}
    </>
  )
}

export default Navbar