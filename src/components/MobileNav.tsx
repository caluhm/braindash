import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

interface MobileNavProps {
    handleClose: () => void;
    navLinks: {
        name: string;
        link: string;
    }[];
}

const MobileNav = ({ handleClose, navLinks}: MobileNavProps) => {
    const pathname = usePathname()

    return (
        <>
        <div className='fixed w-[100vw] h-full min-h-[100vh] top-0 left-0 z-[500] bg-white/10 backdrop-blur-sm flex flex-col justify-start items-center p-4'></div>
            <aside className='absolute top-0 left-0 w-full h-fit drop-shadow-lg bg-white py-6 px-8 z-[501]'>
                <ul className='flex flex-col items-center justify-center gap-5 text-white text-md font-semibold tracking-wide'>
                    <div className='w-full flex flex-row justify-between'>
                        <Link href='/'>
                            <span className='text-xl font-bold text-[#2B87D1] hover:text-[#78baf0] transition-colors ease-in-out duration-200'>BrainDash</span>
                        </Link>
                        <button className='ml-auto'>
                            <IoMdClose className='text-black' size={32} onClick={handleClose} />
                        </button>
                    </div>
                    {navLinks.map((item: any) => (
                        <Link href={item.link} key={item.name} className='w-full'>
                            <li 
                                className={pathname === item.link ? 'bg-[#2B87D1] hover:bg-[#78baf0] transition-colors ease-in-out duration-200 px-5 py-2.5 rounded-lg w-full text-center cursor-pointer' : 'bg-gray-400 hover:bg-gray-500 transition-colors ease-in-out duration-200 px-5 py-2.5 rounded-lg w-full text-center cursor-pointer'}
                                onClick={handleClose}
                                >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </aside>
        </>
    )
}

export default MobileNav