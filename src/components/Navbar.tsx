'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

const Navbar = () => {
    const [selected, setSelected] = useState('Home')
  return (
    <nav className='h-[5rem] w-full bg-white py-2.5'>
        <div className='h-full flex flex-row items-center justify-between sm:px-18 px-8'>
            <div>
            <Link href='/'>
                <span className='text-xl font-bold text-[#2B87D1] hover:text-[#78baf0] transition-colors ease-in-out duration-200'>BrainDash</span>
            </Link>
            </div>
            <ul className='hidden sm:flex flex-row items-center gap-10 text-gray-950 text-md font-semibold tracking-wide'>
            <li className={` ${selected === 'Home' ? 'text-[#2B87D1] hover:text-[#78baf0]' : 'hover:text-gray-500' } transition-colors ease-in-out duration-200`} onClick={() => setSelected('Home')}>
                <Link href='/'>Home</Link>
            </li>
            <li className={` ${selected === 'Reaction' ? 'text-[#2B87D1] hover:text-[#78baf0]' : 'hover:text-gray-500' } transition-colors ease-in-out duration-200`} onClick={() => setSelected('Reaction')}>
                <Link href='/games/reaction'>Reaction</Link>
            </li>
            <li className={` ${selected === 'Sequence' ? 'text-[#2B87D1] hover:text-[#78baf0]' : 'hover:text-gray-500' } transition-colors ease-in-out duration-200`} onClick={() => setSelected('Sequence')}>
                <Link href='/games/sequence'>Sequence</Link>
            </li>
            <li className={` ${selected === 'Typing' ? 'text-[#2B87D1] hover:text-[#78baf0]' : 'hover:text-gray-500' } transition-colors ease-in-out duration-200`} onClick={() => setSelected('Typing')}>
                <Link href='/games/typing'>Typing</Link>
            </li>
            </ul>
            <div className='sm:hidden flex items-center justify-center text-gray-950'>
                <RxHamburgerMenu size={32} />
            </div>
        </div>
    </nav>
  )
}

export default Navbar