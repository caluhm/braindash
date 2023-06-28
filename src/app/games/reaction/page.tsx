"use client";

import React, { useState, useEffect, useRef } from 'react'

import { BsLightningChargeFill, BsThreeDots, BsFillClockFill } from 'react-icons/bs'
import { MdError } from 'react-icons/md'

import {
  saveReactionScoreToLocalStorage,
  loadReactionScoresFromLocalStorage
} from '../../../lib/LocalStorage'

type Score = {
  date: string;
  time: number;
};

export default function Reaction() {
  const [isGameActive, setIsGameActive] = useState(false)
  const [isGameReady, setIsGameReady] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [times, setTimes] = useState<number[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [averageTime, setAverageTime] = useState<any>(0);
  const [smallestTime, setSmallestTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [bgColour, setBgColour] = useState("bg-[#2B87D1]")
  const [scores, setScores] = useState<Score[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false)
  let timeoutIdRef = useRef<any>();

  useEffect(() => {
    const loadedScores = loadReactionScoresFromLocalStorage();
    setScores(loadedScores);
  }, []);
  
  useEffect(() => {
    setSmallestTime(scores.length !== 0 ? (Math.min(...scores.map((score) => score.time))) : 0);
  }, [scores]);
  
  const iconImgDefault = <BsLightningChargeFill size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const h2TextDefault = 'Reaction Time Test'
  const pTextDefault = 'When the red box turns green, click as quickly as you can. Click anywhere to start.'

  const iconImgWait = <BsThreeDots size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const h2TextWait = 'Wait for green'
  const pTextWait = ''

  const iconImgReady = <BsThreeDots size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const h2TextReady = 'Click!'
  const pTextReady = ''

  const iconImgToSoon = <MdError size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const h2TextToSoon = 'Too soon!'
  const pTextToSoon = 'Click to try again.'

  const iconImgGood = <BsFillClockFill size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const pTextGood = 'Click to keep going'

  const iconImgComplete = <BsLightningChargeFill size={120} className='hover:opacity-70 transition-opacity ease-in-out duration-700'/>
  const pTextComplete = 'Average Reaction Time'

  const [iconImg, setIconImg] = useState(iconImgDefault)
  const [h2Text, setH2Text] = useState(h2TextDefault)
  const [pText, setPText] = useState(pTextDefault)

  useEffect(() => {
    if (endTime !== 0) {
      const reactionTimeMs = endTime - startTime;
      setReactionTime(reactionTimeMs);
      setH2Text(`${reactionTimeMs}ms`);
      setTimes([...times, reactionTimeMs]);
      setStartTime(0);
      setEndTime(0);
    }
  }, [startTime, endTime, reactionTime, times]);

  const handlePlayAgain = () => {
    setIsGameComplete(false);
    setIsGameActive(false);
    setIsGameReady(false);
    setIconImg(iconImgDefault);
    setH2Text(h2TextDefault);
    setPText(pTextDefault);
    setBgColour("bg-[#2B87D1]");
    setEndTime(0);
    setStartTime(0);
    setReactionTime(0);
    setCurrentRound(0);
    setTimes([]);
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

    saveReactionScoreToLocalStorage(scores as Score[], { date: dateString, time: averageTime });
    const loadedScores = loadReactionScoresFromLocalStorage();
    setScores(loadedScores);

    const saveScoreButton = document.getElementById('save-score') as HTMLButtonElement;
    if (saveScoreButton) {
      saveScoreButton.innerHTML = 'Saved!';
      saveScoreButton.disabled = true;
    }
    setSaveButtonDisabled(true);
  };


  const handleClick = () => {
    if (isGameComplete) {
      return;
    }
    clearTimeout(timeoutIdRef.current);
    
    if (isGameActive && !isGameReady) {
      setIsGameActive(false);
      setIsGameReady(false);
      setIconImg(iconImgToSoon);
      setH2Text(h2TextToSoon);
      setPText(pTextToSoon);
      setBgColour("bg-[#2B87D1]");
      setEndTime(0);
      setStartTime(0);
      setReactionTime(0);
    } else if (!isGameActive) {
      setEndTime(0);
      setStartTime(0);
      setReactionTime(0);
      setIsGameActive(true);
      setIconImg(iconImgWait);
      setH2Text(h2TextWait);
      setPText(pTextWait);
      setBgColour("bg-red-500");

      const timeoutID = setTimeout(() => {
        setEndTime(0);
        setStartTime(0);
        setReactionTime(0);
        setIconImg(iconImgReady);
        setH2Text(h2TextReady);
        setPText(pTextReady);
        setBgColour("bg-green-500");
        setIsGameReady(true);
        setStartTime(Date.now());
      }, Math.floor(Math.random() * 5000) + 1000);
      
      timeoutIdRef.current = timeoutID;
    } else if (isGameReady) {
      if (currentRound === 4) {
        setEndTime(Date.now());

        const averageTime = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(0);
        setAverageTime(averageTime);
        setIsGameActive(false);
        setIsGameReady(false);
        setIconImg(iconImgComplete);
        setH2Text(`${averageTime}ms`);
        setPText(pTextComplete);
        setBgColour("bg-[#2B87D1]");
        setEndTime(0);
        setStartTime(0);
        setReactionTime(0);
        setCurrentRound(0);
        setTimes([]);
        setIsGameComplete(true);

        return;
      }
      setCurrentRound(currentRound + 1);
      setIsGameReady(false);
      setIsGameActive(false);
      setIconImg(iconImgGood);
      setPText(pTextGood);
      setBgColour("bg-[#2B87D1]");

      setEndTime(Date.now());
    }
  };

  return (
    <main className="h-[calc(100vh-5rem)] bg-[#E6E8F4]">
      <div className="flex flex-col h-full">
        <div 
          className={`flex justify-center items-center w-full h-[540px] select-none ${bgColour} ${isGameComplete ? null : 'cursor-pointer'}`}
          tabIndex={0}
          onClick={() => handleClick()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
        }}
        >
          <div className='flex flex-col justify-center items-center h-full p-5 text-white'>
            <div>{iconImg}</div>
            <h2 className='text-6xl font-bold mt-12 pb-6 text-center'>{h2Text}</h2>
            <p className='text-xl font-medium text-center max-w-xl'>{pText}</p>
            {isGameComplete && (
              <div className='flex flex-row justify-center items-center mt-10 gap-3 text-gray-950'>
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
                <button className='bg-blue-300 font-semibold text-lg py-2 px-6 rounded hover:bg-blue-50 transition-colors ease-in-out duration-150' onClick={handlePlayAgain}>Play again</button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(100vh-5rem-540px)] px-4'>
          <h3 className='text-4xl font-bold text-center pb-6'>Personal Best: {smallestTime}ms</h3>
          <h4 className='text-2xl font-semibold text-center pb-2'>Previous Times</h4>
          <div className='max-h-[calc(100vh-5rem-700px)] overflow-y-auto py-3 px-8 bg-[#d1d3dd] rounded'>
            {!(scores.length === 0) ? (
            <ul>
              {scores.map((score, index) => (
                <li className='text-lg font-medium text-center' key={index}><span className='font-bold'>{score.time}ms</span> - {score.date}</li>
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