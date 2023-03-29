import styles from "./App.css";
import React, { useEffect, useState } from "react";
import { settings } from "./constants";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [timeToSec, setTimeToSec] = useState(0);
  const [hide, setHide] = useState(true);
  const [pause, setPause] = useState("Pause");

  useEffect(() => {
    if (seconds >= 1 || minutes >= 1) {
      setTimeToSec(minutes * 60 + seconds);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (minutes >= 1 || seconds >= 1) {
      if (minutes >= 1 && seconds <= 0 && started != false) {
        setMinutes(minutes - 1);
        setSeconds(59);
        console.log(minutes, seconds);
      } else if (seconds >= 60) {
        setMinutes(minutes + 1);
        setSeconds(seconds - 60);
      }
    } else if (seconds == 0 && minutes == 0 && progress > 0) {
      setProgress(100);
      setMinutes(0);
      setSeconds(0);
      setStarted(false);
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 3000);
    }

    if (started != false && progress <= 100) {
      const interval = setInterval(() => {
        setProgress(progress + step);
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const handleTime = (m, s) => {
    setMinutes(minutes + m);
    setSeconds(seconds + s);
  };

  const handleStart = () => {
    let s = 100 / timeToSec;
    if (timeToSec > 0 && started != true && progress == 0) {
      setStep(s);
      setStarted(true);
      setProgress(0);
    } else {
      setProgress(progress);
      setStarted(true);
      setStep(step);
    }
  };

  // const pauseHandler = () => {
  // if (!started) {
  // setStarted(true);
  // setPause("pause");
  // } else {
  // setStarted(false);
  // setPause("unpause");
  // }
  // };
  return (
    <>
      <section className="page">
        <div className="container">
          <div className="perc"></div>
          <div className="timeWrp">
            <p className="text">{minutes <= 9 ? `0${minutes}` : minutes}</p>
            <span className="text">:</span>
            <p className="text">{seconds <= 9 ? `0${seconds}` : seconds}</p>
          </div>
          <div className="buttonsWrp">
            <button className="settingsBtn" onClick={() => setHide(!hide)}>
              {settings}
            </button>
            <div className={hide ? "hidden" : "settingsWrp"}>
              <button
                className="timerBtn"
                onClick={() => {
                  handleTime(1, 0);
                }}
              >
                <p className="btnText">+1M</p>
              </button>
              <button
                className="timerBtn"
                onClick={() => {
                  handleTime(0, 15);
                }}
              >
                <p className="btnText">+15S</p>
              </button>
              <button
                className="timerBtn"
                onClick={() => {
                  handleStart();
                }}
              >
                <p className="btnText">start</p>
              </button>
              <button
                style={{ marginRight: "0" }}
                className="timerBtn"
                onClick={() => {
                  setStarted(false);
                }}
              >
                <p className="btnText">stop</p>
              </button>
            </div>
          </div>
        </div>
        <div className="progressBar">
          <CircularProgressbar
            value={progress}
            styles={buildStyles({ pathTransitionDuration: 1 })}
          />
        </div>
      </section>
    </>
  );
};
