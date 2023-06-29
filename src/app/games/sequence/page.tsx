'use client'

import { useState, useEffect } from 'react'
import { TbSquareRoundedNumber1Filled } from 'react-icons/tb'

export default  function Sequence() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentPattern, setCurrentPattern] = useState([])

  const startGame = () => {
    setIsGameStarted(true)
    setCurrentLevel((prev) => prev + 1)
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div className='flex justify-center items-center w-full min-h-[540px] select-none bg-[#2B87D1]'>
        
        {!isGameStarted ? (
          <div className='flex flex-col justify-center items-center h-full p-5 text-white'>
            <div>
              <TbSquareRoundedNumber1Filled size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
            </div>
            <h2 className='text-6xl font-bold mt-10 pb-6 text-center'>Sequence Memory Game</h2>
            <p className='text-xl font-medium text-center max-w-xl pb-8'>Memorize the pattern displayed in the grid.</p>
            <button 
              className='text-gray-950 bg-yellow-300 font-semibold text-lg py-2 px-6 rounded hover:bg-yellow-50 transition-colors ease-in-out duration-150'
              onClick={() => {startGame()}}
            >
                Start
              </button>
          </div>
        ) : (
          <div className='h-full flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-normal text-gray-200/75 text-center pb-6'>Level: <span className='text-white'>{currentLevel}</span></h2>
            <div className='grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-4'>
              {Array.from(Array(9).keys()).map((i) => (
                <div key={i} className='bg-[#226aa5] rounded-lg w-28 h-28'></div>
              ))}
            </div>
          </div>
        )}
        </div>
        <div className='flex flex-col justify-center items-center min-h-[calc(100vh-5rem-540px)] px-4 sm:py-0 py-6'>
          <h3 className='text-4xl font-bold text-center pb-6'>Personal Best: 10</h3>
          <h4 className='text-2xl font-semibold text-center pb-2'>Previous Scores</h4>
          <div className='max-h-[calc(100vh-5rem-700px)] min-h-[3.25rem] overflow-y-auto py-3 px-8 bg-[#d1d3dd] rounded'>
            <p className='text-lg font-medium text-center'>No scores saved</p>
          </div>
        </div>
          
      </div>
    </main>
  )
}
