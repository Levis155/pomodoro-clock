import { useState, useEffect, useRef } from "react";
import "./App.css";

interface AudioElement extends HTMLAudioElement {
  currentTime: number;
  play(): Promise<void>;
  pause(): void;
}

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef<AudioElement | null>(null);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }

      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, breakLength, sessionLength, timerLabel]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsRunning(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const incrementBreak = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (timerLabel === "Break") {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const decrementBreak = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (timerLabel === "Break") {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const incrementSession = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const decrementSession = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const timeLeftClass = timeLeft <= 60 ? "time-left warning" : "time-left";
  return (
    <div className="app-wrapper">
      <div className="app-title">
        <hr className="left-line" />
        <h1>pomodoro clock</h1>
        <hr className="right-line" />
      </div>

      <div className="timer-length-btns">
        <div className="break-length">
          <span>break length</span>
          <div className="increment-decrement-btns">
            <button onClick={decrementBreak} disabled={isRunning}>
              -
            </button>
            <div className="length-display">{breakLength}</div>
            <button onClick={incrementBreak} disabled={isRunning}>
              +
            </button>
          </div>
        </div>

        <div className="session-length">
          <span>session length</span>
          <div className="increment-decrement-btns">
            <button onClick={decrementSession} disabled={isRunning}>
              -
            </button>
            <div className="length-display">{sessionLength}</div>
            <button onClick={incrementSession} disabled={isRunning}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="timer">
        <span className="timer-title">{timerLabel}</span>
        <span className={timeLeftClass} id={timeLeftClass}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="stop-reset-btns">
        <button onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>reset</button>
      </div>

      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      />

      <span className="dev-info">
        Designed and coded by{" "}
        <a href="https://www.linkedin.com/in/levis-mbui/" target="_blank">
          Levis Mbui
        </a>
      </span>
    </div>
  );
}

export default App;
