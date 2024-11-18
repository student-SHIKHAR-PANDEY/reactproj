import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false);
  let countdownInterval = null;

  const fetchTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
  };

  const startCountdown = () => {
    if (!timerRunning && countdown !== null && countdown > 0) {
      setTimerRunning(true);
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setTimerRunning(false);
            setShowTimesUp(true);
            setTimeout(() => setShowTimesUp(false), 1500);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseCountdown = () => {
    setTimerRunning(false);
    clearInterval(countdownInterval);
  };

  const resetCountdown = () => {
    setTimerRunning(false);
    clearInterval(countdownInterval);
    setCountdown(null);
    setShowTimesUp(false);
  };

  const setInitialCountdown = () => {
    if (!timerRunning) {
      const input = parseInt(prompt("Enter countdown time in seconds:"), 10);
      if (!isNaN(input) && input > 0) {
        setCountdown(input);
      } else {
        alert("Please enter a valid positive number.");
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>System Time & Countdown App</h1>

        {/* Current Time Section */}
        <div className="time-container">
          <button className="btn" onClick={fetchTime}>
            🕒 Show Current Time
          </button>
          {currentTime && <div className="time-display">Current Time: {currentTime}</div>}
        </div>

        {/* Countdown Timer Section */}
        <div className="countdown-container">
          {countdown !== null && (
            <div className="countdown-circle">
              <span className="countdown-text">{countdown}s</span>
            </div>
          )}

          {/* "Times Up!" message */}
          {showTimesUp && <div className="times-up">⏰ Times Up!</div>}

          <div className="buttons">
            <button className="btn start-btn" onClick={startCountdown}>
              ▶️ Start
            </button>
            <button className="btn pause-btn" onClick={pauseCountdown}>
              ⏸️ Pause
            </button>
            <button className="btn reset-btn" onClick={resetCountdown}>
              🔄 Reset
            </button>
          </div>
          <button className="btn" onClick={setInitialCountdown}>
            ⏳ Set Countdown
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
