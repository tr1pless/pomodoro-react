import styles from './App.css'
import React, { useEffect, useState } from 'react'
import { pauseSvg, play, settings } from './constants'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const App = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [timeToSec, setTimeToSec] = useState(0)
  const [hide, setHide] = useState(true)
  const [pause, setPause] = useState(false)
  const [afterPause, setAfterPause] = useState(0)

  useEffect(() => {
    if (minutes >= 60) {
      setMinutes(60)
    }
  }, [minutes])
  useEffect(() => {
    if (seconds >= 1 || minutes >= 1) {
      if (!pause) {
        setTimeToSec(minutes * 60 + seconds)
      } else {
        setAfterPause(minutes * 60 + seconds)
      }
    }
  }, [minutes, seconds])

  useEffect(() => {
    if (minutes >= 1 || seconds >= 1) {
      if (minutes >= 1 && seconds <= 0 && started != false) {
        setMinutes(minutes - 1)
        setSeconds(59)
        console.log(minutes, seconds)
      } else if (seconds >= 60) {
        setMinutes(minutes + 1)
        setSeconds(seconds - 60)
      }
    } else if (seconds == 0 && minutes == 0 && progress > 0) {
      setProgress(100)
      setMinutes(0)
      setSeconds(0)
      setStarted(false)
      const timeout = setTimeout(() => {
        setProgress(0)
        setHide(false)
      }, 3000)
    }

    if (started != false && progress <= 100) {
      const interval = setInterval(() => {
        setProgress(progress + step)
        setSeconds(seconds - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  })

  const handleTime = (m, s) => {
    if (started) {
      return
    } else {
      setMinutes(minutes + m)
      setSeconds(seconds + s)
    }
  }

  const clear = () => {
    setSeconds(seconds - seconds)
    setMinutes(minutes - minutes)
    setStarted(false)
    setProgress(0)
    setStep(0)
  }

  const handleStart = () => {
    if (timeToSec) {
      let s = 100 / timeToSec
      setPause(false)
      if (timeToSec > 0 && started != true && progress == 0) {
        setStep(s)
        setStarted(true)
        setProgress(0)
      } else if (pause && afterPause > timeToSec) {
        setStep(s)
        setStarted(true)
        setProgress(0)
      } else {
        setProgress(progress)
        setStarted(true)
        setStep(step)
      }
    } else {
      return
    }
  }
  const handlePause = () => {
    setStarted(false)
    setPause(true)
  }
  return (
    <>
      <section className='page'>
        <div className='timeWrpBg'>
          <div className='container'>
            <div className='perc'></div>

            <div
              className='timeWrp'
              style={hide ? { marginTop: '180px' } : null}
            >
              <p className='text'>{minutes <= 9 ? `0${minutes}` : minutes}</p>
              <span className='text'>:</span>
              <p className='text'>{seconds <= 9 ? `0${seconds}` : seconds}</p>
            </div>
            <div className='buttonsWrp'>
              <button className='settingsBtn' onClick={() => setHide(!hide)}>
                {settings}
              </button>
              <div className='settingsWrp'>
                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonLeft' : 'timerBtn'
                  }
                  onClick={() => {
                    handleTime(30, 0)
                  }}
                >
                  +30M
                </button>

                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonLeft' : 'timerBtn'
                  }
                  onClick={() => {
                    handleTime(10, 0)
                  }}
                >
                  +10M
                </button>

                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonLeft' : 'timerBtn'
                  }
                  onClick={() => {
                    handleTime(5, 0)
                  }}
                >
                  +5M
                </button>
                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonRight' : 'timerBtn'
                  }
                  onClick={() => {
                    clear()
                  }}
                >
                  Clear
                </button>
                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonRight' : 'timerBtn'
                  }
                  onClick={() => {
                    handleTime(0, 30)
                  }}
                >
                  +30S
                </button>
                <button
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonRight' : 'timerBtn'
                  }
                  onClick={() => {
                    handleStart()
                  }}
                >
                  {play}
                </button>
                <button
                  style={{ marginRight: '0' }}
                  className={
                    hide ? 'timerBtn' + ' ' + 'hButtonRight' : 'timerBtn'
                  }
                  onClick={() => {
                    handlePause()
                  }}
                >
                  {pauseSvg}
                </button>
              </div>
            </div>
          </div>
          <div className='progressBar'>
            <CircularProgressbar
              strokeWidth={4}
              value={progress}
              styles={buildStyles({
                pathTransitionDuration: 1,
                pathColor: `rgb(30 208 175 / 44%)`,
                trailColor: 'none',
                strokeWidth: '4',
              })}
            />
          </div>
        </div>
      </section>
    </>
  )
}
