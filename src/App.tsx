import React, { useState } from "react";
import useSound from "use-sound";
import bubblePopSound from "./assets/sounds/bubble-pop.wav";
import bellSound from "./assets/sounds/bell.wav";
import { useTimer } from "react-timer-hook";
import "./App.css";
import { padZeros } from "./utils/helpers";

interface IState {
  workDurationSec: number;
  restDurationSec: number;
  repetitionCount: number;
  currentRepetition?: number;
}

export default function App() {
  const [playWorkCountdown] = useSound(bubblePopSound);
  const [playWorkComplete] = useSound(bellSound);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: playWorkCountdown,
  });

  console.log(seconds);

  if (seconds > 0 && seconds <= 3) {
    playWorkCountdown();
  } else if (seconds <= 0) {
    playWorkComplete();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>react-timer-hook </h1>
          <p>Timer Demo</p>
          <div style={{ fontSize: "100px" }}>
            <span>{padZeros(minutes, 2)}</span>:
            <span>{padZeros(seconds, 2)}</span>
          </div>
          <p>{isRunning ? "Running" : "Not running"}</p>
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
          <button
            onClick={() => {
              // Restarts to 5 minutes timer
              const time = new Date();
              time.setSeconds(time.getSeconds() + 300);
              restart(time);
            }}
          >
            Restart
          </button>
        </div>
      </header>
    </div>
  );
}
