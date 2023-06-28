"use client";

import '../../globals.css'
import { paragraphs } from "@/lib/Paragraphs";
import { useState, useEffect, useRef } from "react";

import {
  saveTypingScoreToLocalStorage,
  loadTypingScoresFromLocalStorage
} from '../../../lib/LocalStorage'

type Score = {
  date: string;
  wpm: number;
};

const getParagraph = () => {
  const data = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  return data;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default function Typing() {
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [paragraph, setParagraph] = useState(() => {
    const initialParagraph = getParagraph();
    return initialParagraph;
  });
  const [scores, setScores] = useState<Score[]>([]);
  const [bestWPM, setBestWPM] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadedScores = loadTypingScoresFromLocalStorage();
    setScores(loadedScores);
  }, []);
  
  useEffect(() => {
    setBestWPM(scores.length !== 0 ? (Math.max(...scores.map((score) => score.wpm))) : 0);
  }, [scores]);
  
  useEffect(() => {
    if (isGameActive) {
      const timer = setInterval(() => {
        setTimeTaken((prevTime) => prevTime + 1);
      }, 1000);
  
      // Clean up the interval on component unmount
      return () => {
        clearInterval(timer);
      };
    } else {
      return;
    }
  }, [isGameActive]);

  const handleComplete = () => {
    setIsGameComplete(true);
    setIsGameActive(false);
    const accuracy = 1 - mistakes / typedText.length;
    const totalWords = typedText.length / 5;
    const calcWpm = Math.round(totalWords / (timeTaken / 60));
    const finalWpm = Math.round(calcWpm * accuracy);
    setWpm(finalWpm);
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

    saveTypingScoreToLocalStorage(scores as Score[], { date: dateString, wpm: wpm });
    const loadedScores = loadTypingScoresFromLocalStorage();
    setScores(loadedScores);

    const saveScoreButton = document.getElementById('save-score') as HTMLButtonElement;
    if (saveScoreButton) {
      saveScoreButton.innerHTML = 'Saved!';
      saveScoreButton.disabled = true;
    }
    setSaveButtonDisabled(true);
  }

  const handleReset = () => {
    setIsGameComplete(false);
    setIsGameActive(false);
    const initialParagraph = getParagraph();
    setParagraph(initialParagraph);
    setTypedText('');
    setTimeTaken(0);
    setMistakes(0);
    setWpm(0);
    setCpm(0);
    setCurrentIndex(0);
    setSaveButtonDisabled(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateWPM = () => {
    const timeInMinutes = timeTaken / 60;
    console.log(timeInMinutes);
    setWpm(Math.floor(typedText.length / 5 / timeInMinutes));
    console.log(wpm);
    setCpm(Math.floor(typedText.length / timeInMinutes));
    console.log(cpm);
  };

  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        calculateWPM();
      }, 100);

      return () => {
        clearInterval(interval);
      };
    } else {
      return;
    }
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Start the game on the first key press
    const typedCharacter = event.key;
    const currentCharacter = paragraph[currentIndex];
  
    // Valid characters: Alphanumeric, comma, period, space, quotes, at symbol, and other special characters
    const isValidCharacter =
      /^[a-zA-Z0-9,.\s"'@#$%^&*()\-_+=~`[\]{}|:;"<>,.?\\/!]$/.test(typedCharacter) ||
      event.key === 'Backspace';
  
    if (isValidCharacter) {
      setIsGameActive(true);
      if (event.key === 'Backspace') {
        setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  
        // Decrement mistakes count if the removed character was incorrect
        if (typedText[currentIndex - 1] !== currentCharacter) {
          setMistakes((prevMistakes) => prevMistakes - 1);
        }
      } else {
        setTypedText((prevTypedText) => prevTypedText + typedCharacter);
        setCurrentIndex((prevIndex) => prevIndex + 1);
  
        // Increment mistakes count if the typed character is incorrect
        if (typedCharacter !== currentCharacter) {
          setMistakes((prevMistakes) => prevMistakes + 1);
        }
      }
  
      if (currentIndex === paragraph.length - 1) {
        // Game is complete
        handleComplete();
        return;
      }
    }
  };
  

  useEffect(() => {
    if (inputRef.current && isContainerFocused) {
      inputRef.current.focus();
    }
  }, [isContainerFocused]);

  return (
    <main className="h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div className='flex justify-center items-center w-full min-h-[540px] select-none bg-[#2B87D1]'>
          <div className='flex flex-col justify-center items-center h-full p-5 text-white gap-6'>
            {!isGameComplete ? (
            <>
            <div>
              {!isGameActive ? (
              <h2 className='text-6xl font-bold pb-6 text-center'>Typing Test</h2>
              ) : (
              <h2 className='text-6xl font-bold pb-6 text-center'>{wpm}</h2>
              )}
              <p className='text-xl font-medium text-center max-w-xl'>How many words per minute an you type?</p>
            </div>
            <div
              className={`max-w-[900px] bg-blue-200 focus:bg-blue-100 rounded-md cursor-pointer transition-colors ease-in-out duration-200 focus:ring-0 ${
                isContainerFocused ? 'container-focused' : ''
              } outline-none`}
              tabIndex={isGameComplete ? -1 : 0}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              onFocus={() => setIsContainerFocused(true)}
              onBlur={() => setIsContainerFocused(false)}
            >
            <div className='text-center p-5 text-lg w-full h-full'>
              {paragraph.split('').map((character, index) => {
                const isCurrent = index === currentIndex;
                const isCorrect = typedText[index] === character;
                const isCompleted = index < currentIndex;
                const cursorAnimation = isCurrent ? 'animate-blink' : '';

                let bgColorClass = '';
                if (isCorrect && isCompleted) {
                  bgColorClass = 'bg-[#87E88F]';
                } else if (!isCorrect && isCompleted) {
                  bgColorClass = 'bg-[#EA737B]';
                }

                return (
                  <span
                    key={index}
                    className={`cursor-text text-black ${cursorAnimation} ${bgColorClass}`}
                  >
                    {character}
                  </span>
                  );
                })}
              </div>
            </div>
            {!isGameActive ? (
              <span className='text-base font-normal'>Start typing to begin.</span>
              ) : (
              <span className='text-4xl font-bold'>{formatTime(timeTaken)}</span>
              )
            } 
            </>
            ) : (
              <>
                <h2 className='text-6xl font-bold pb-6 text-center'>{wpm}wpm</h2>
                <p className='text-xl font-medium text-center max-w-xl'>Good effort, want to try again and get a better score?</p>
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
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(100vh-5rem-540px)] px-4'>
          <h3 className='text-4xl font-bold text-center pb-6'>Personal Best: {bestWPM}wpm</h3>
          <h4 className='text-2xl font-semibold text-center pb-2'>Previous Times</h4>
          <div className='max-h-[calc(100vh-5rem-700px)] overflow-y-auto py-3 px-8 bg-[#d1d3dd] rounded'>
            {!(scores.length === 0) ? (
            <ul>
              {scores.map((score, index) => (
                <li className='text-lg font-medium text-center' key={index}><span className='font-bold'>{score.wpm}wpm</span> - {score.date}</li>
              ))}
            </ul>
            ) : (
              <p className='text-lg font-medium text-center'>No scores saved</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


