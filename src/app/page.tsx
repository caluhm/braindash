import Link from 'next/link'
import { BsLightningChargeFill, BsFillClockFill } from 'react-icons/bs'
import { TbSquareRoundedNumber1Filled } from 'react-icons/tb'
import { MdKeyboardAlt } from 'react-icons/md'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div className='flex justify-center items-center w-full h-[540px] select-none cursor-pointer bg-[#2B87D1]'>
          <div className='flex flex-col justify-center items-center h-full p-5 text-white'>
            <div><BsLightningChargeFill size={184} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/></div>
            <h2 className='text-6xl font-bold mt-12 pb-6 text-center'>BrainDash</h2>
            <p className='text-xl font-medium text-center max-w-xl'>Measure your abilities with brain games and cognitive tests.</p>
              <div className='flex flex-row justify-center items-center mt-10 gap-3 text-gray-950'>
                <Link href='/games/reaction'>
                <button className='bg-yellow-300 font-semibold text-lg py-2 px-6 rounded hover:bg-yellow-50 transition-colors ease-in-out duration-150'>Get Started</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
      <section className='flex justify-center items-center sm:py-16 sm:px-6 py-8 px-4 h-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[900px]'>
          <Link href='/games/reaction'>
            <div className='flex flex-col justify-center items-center text-center bg-white text-blue-400 hover:text-orange-400 p-5 gap-4 rounded-md shadow-md border border-gray-300 transition-all hover:scale-105 ease-in-out duration-300 h-full'>
              <BsLightningChargeFill size={100}/>
              <h3 className='text-2xl font-bold pt-4 text-black'>Reaction</h3>
              <p className='text-lg font-medium text-black'>Click the button as fast as you can when it turns green.</p>
            </div>
          </Link>
          <Link href='/games/sequence'>
            <div className='flex flex-col justify-center items-center text-center bg-white text-blue-400 hover:text-orange-400 p-5 gap-4 rounded-md shadow-md border border-gray-300 transition-all hover:scale-105 ease-in-out duration-300 h-full'>
              <TbSquareRoundedNumber1Filled size={100}/>
              <h3 className='text-2xl font-bold pt-4 text-black'>Sequence</h3>
              <p className='text-lg font-medium text-black'>Remember the sequence of numbers and click them in order.</p>
            </div>
          </Link>
          <Link href='/games/typing'>
            <div className='flex flex-col justify-center items-center text-center bg-white text-blue-400 hover:text-orange-400 p-5 gap-4 rounded-md shadow-md border border-gray-300 transition-all hover:scale-105 ease-in-out duration-300 h-full'>
              <MdKeyboardAlt size={100}/>
              <h3 className='text-2xl font-bold pt-4 text-black'>Typing</h3>
              <p className='text-lg font-medium text-black'>Type accurately as fast as you can to find your WPM.</p>
            </div>
          </Link>
          <div className='flex flex-col justify-center items-center text-center bg-white p-5 gap-4 rounded-md shadow-md border border-gray-300 cursor-not-allowed h-full'>
            <BsFillClockFill size={100} className='text-blue-400'/>
            <h3 className='text-2xl font-bold pt-4'>Coming Soon</h3>
            <p className='text-lg font-medium'>More games and tests are coming soon, so stay tuned!</p>
          </div>
        </div>
      </section>
    </main>
  )
}
