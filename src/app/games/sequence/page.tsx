'use client'

import { useState, useEffect } from 'react'
import { TbSquareRoundedNumber1Filled } from 'react-icons/tb'
import { 
  loadSequenceScoresFromLocalStorage, 
  saveSequenceScoreToLocalStorage 
} from '../../../lib/LocalStorage'

type Score = {
  date: string;
  level: number;
};

export default  function Sequence() {
  const [scores, setScores] = useState<Score[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [sequence, setSequence] = useState<number[]>([])
  const [grid0Text, setGrid0Text] = useState('')
  const [grid1Text, setGrid1Text] = useState('')
  const [grid2Text, setGrid2Text] = useState('')
  const [grid3Text, setGrid3Text] = useState('')
  const [grid4Text, setGrid4Text] = useState('')
  const [grid5Text, setGrid5Text] = useState('')
  const [grid6Text, setGrid6Text] = useState('')
  const [grid7Text, setGrid7Text] = useState('')
  const [grid8Text, setGrid8Text] = useState('')
  
  const [currentGameLevel, setCurrentGameLevel] = useState(0);

  const [bgColour, setBgColour] = useState('bg-[#2B87D1]')
  const [isAnimating, setIsAnimating] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  useEffect(() => {
    const loadedScores = loadSequenceScoresFromLocalStorage();
    setScores(loadedScores);
  }, []);
  
  useEffect(() => {
    setBestScore(scores.length !== 0 ? (Math.max(...scores.map((score) => score.level))) : 0);
  }, [scores]);
  
  const resetGridText = () => {
    setGrid0Text('');
    setGrid1Text('');
    setGrid2Text('');
    setGrid3Text('');
    setGrid4Text('');
    setGrid5Text('');
    setGrid6Text('');
    setGrid7Text('');
    setGrid8Text('');
  };
  
  useEffect(() => {
    if (isGameStarted) {
      setIsAnimating(true);
  
      const randomNumber = Math.floor(Math.random() * 9);
      setSequence((prev) => [...prev, randomNumber]);
  
      // Store the updated sequence in a separate variable
      const updatedSequence = [...sequence, randomNumber];
  
      const setGridTextAndReset = (value: number, i: number) => {
        if (value === 0) {
          setGrid0Text(i + 1 + '');
        } else if (value === 1) {
          setGrid1Text(i + 1 + '');
        } else if (value === 2) {
          setGrid2Text(i + 1 + '');
        } else if (value === 3) {
          setGrid3Text(i + 1 + '');
        } else if (value === 4) {
          setGrid4Text(i + 1 + '');
        } else if (value === 5) {
          setGrid5Text(i + 1 + '');
        } else if (value === 6) {
          setGrid6Text(i + 1 + '');
        } else if (value === 7) {
          setGrid7Text(i + 1 + '');
        } else if (value === 8) {
          setGrid8Text(i + 1 + '');
        }
  
        setTimeout(() => {
          resetGridText();
          if (i === currentLevel - 1) {
            setIsAnimating(false); // Set the flag to false after the animation completes
          }
        }, 1000);
      };
  
      for (let i = 0; i < currentLevel; i++) {
        setTimeout(() => {
          setGridTextAndReset(updatedSequence[i], i);
        }, (1000 + 500) * (i + 1));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStarted, currentLevel]);
  
  const startGame = () => {
    setIsGameStarted(true);
  };
  
  const handleClick = (i: number) => {
    if (isAnimating) return;
    if (sequence[currentGameLevel] === i && currentGameLevel === currentLevel - 1) {
      gameWonBgColor();
      console.log('correct, next level');
      setCurrentGameLevel(0);
      setCurrentLevel((prev) => prev + 1);
    } else if (sequence[currentGameLevel] === i) {
      console.log('correct');
      setCurrentGameLevel((prev) => prev + 1);
    } else {
      gameLostBgColor();
      //setIsGameStarted(false);
      //setCurrentLevel(1);
      setIsGameFinished(true);
      setCurrentGameLevel(0);
      setSequence([]);
      resetGridText();
    }
  };

  const gameLostBgColor = () => {
    setBgColour('bg-red-500')

    setTimeout(() => {
      setBgColour('bg-[#2B87D1]')
    }, 1000)
  };

  const gameWonBgColor = () => {
    setBgColour('bg-green-500')
    
    setTimeout(() => {
      setBgColour('bg-[#2B87D1]')
    }, 1000)
  };

  const handleSaveScore = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    saveSequenceScoreToLocalStorage(scores as Score[], { date: dateString, level: currentLevel });
    const loadedScores = loadSequenceScoresFromLocalStorage();
    setScores(loadedScores);

    const saveScoreButton = document.getElementById('save-score') as HTMLButtonElement;
    if (saveScoreButton) {
      saveScoreButton.innerHTML = 'Saved!';
      saveScoreButton.disabled = true;
    }
    setSaveButtonDisabled(true);
  }

  const handleReset = () => {
    setIsGameStarted(false);
    setIsGameFinished(false);
    setCurrentLevel(1);
    setSaveButtonDisabled(false);
  };
  
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div className={`flex justify-center items-center w-full min-h-[540px] select-none ${bgColour} transition-colors ease-in-out duration-200`}>
        
        {!isGameStarted && (
          <div className='flex flex-col justify-center items-center h-full p-5 text-white'>
            <div>
              <TbSquareRoundedNumber1Filled size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
            </div>
            <h2 className='sm:text-6xl text-4xl font-bold mt-10 pb-6 text-center'>Sequence Memory Game</h2>
            <p className='sm:text-xl text-base font-medium text-center max-w-xl pb-8'>Memorize the pattern displayed in the grid.</p>
            <button 
              className='text-gray-950 bg-yellow-300 font-semibold text-lg py-2 px-6 rounded hover:bg-yellow-50 transition-colors ease-in-out duration-150'
              onClick={() => startGame()}
            >
                Start
              </button>
          </div>
        )}
        {isGameStarted && !isGameFinished && (
          <div className='h-full flex flex-col justify-center items-center'>
            <h2 className='sm:text-2xl text-xl font-normal text-gray-200/75 text-center pb-6'>Level: <span className='text-white'>{currentLevel}</span></h2>
            <div className='grid grid-cols-3 grid-rows-3 sm:gap-x-4 sm:gap-y-4 gap-x-2 gap-y-2'>
                <div 
                  className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(0)}
                >{grid0Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(1)}
                >{grid1Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(2)}
                >{grid2Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(3)}
                >{grid3Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(4)}
                >{grid4Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(5)}
                >{grid5Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(6)}
                >{grid6Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(7)}
                >{grid7Text}</div>
                <div 
                   className={`bg-[#226aa5] hover:bg-[#2c79b8] rounded-lg sm:w-28 sm:h-28 h-24 w-24 flex justify-center items-center text-5xl font-bold text-white transition-colors ease-in-out duration-150 hover:drop-shadow-sm ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleClick(8)}
                >{grid8Text}</div>
              
            </div>
          </div>
        )}
        {isGameFinished && (
          <div className='flex flex-col justify-center items-center h-full p-5 text-white'>
            <div>
              <TbSquareRoundedNumber1Filled size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
            </div>
            <h2 className='sm:text-6xl text-4xl font-bold mt-10 pb-6 text-center'>Your reached: Level {currentLevel}</h2>
            <p className='sm:text-xl text-base font-medium text-center max-w-xl pb-8'>Why not try again and get a higher score?</p>
            <div className='flex flex-row justify-center items-center mt-6 gap-3 text-gray-950'>
                  <button
                    id="save-score"
                    className={`${
                      saveButtonDisabled ? 'bg-green-300 cursor-not-allowed' : 'bg-yellow-300 cursor-pointer'} 
                      font-semibold text-lg py-2 px-6 rounded ${
                      saveButtonDisabled ? null : 'hover:bg-yellow-50'} 
                      transition-colors ease-in-out duration-150`}
                    onClick={handleSaveScore}
                  >
                    Save score
                  </button>
                  <button className='bg-blue-300 font-semibold text-lg py-2 px-6 rounded hover:bg-blue-50 transition-colors ease-in-out duration-150' onClick={handleReset}>Play again</button>
                </div>
          </div>
        )}
        </div>
        <div className='flex flex-col justify-center items-center min-h-[calc(100vh-5rem-540px)] px-4 sm:py-0 py-6'>
          <h3 className='sm:text-4xl text-2xl font-bold text-center pb-6'>Personal Best: Level {bestScore}</h3>
          <h4 className='sm:text-2xl text-lg font-semibold text-center pb-2'>Previous Scores</h4>
          <div className='max-h-[calc(100vh-5rem-500px)] min-h-[3.25rem] overflow-y-auto py-3 px-8 bg-[#d1d3dd] rounded'>
          {!(scores.length === 0) ? (
            <ul>
              {scores.map((score, index) => (
                <li className='text-lg font-medium text-center' key={index}><span className='font-bold'>Level {score.level}</span> - {score.date}</li>
              ))}
            </ul>
            ) : (
              <p className='text-lg font-medium text-center'>No scores saved</p>
            )}
          </div>
        </div>
          
      </div>
    </main>
  )
}
