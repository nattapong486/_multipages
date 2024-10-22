import "./Timer.css";


import { useEffect, useState } from "react";

function Timer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  function runClick() {
    setRunning(!running);
  }

  function resetClick() {
    setRunning(false);
    setSeconds(0);
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hours} h ${minutes} m ${secs} s`;
  };



  return (
    <div className="timer-container">
      <h3 className="timer-title">Timer</h3>
      <p>
        <input
          className="timer-display"
          type="text"
          readOnly={true}
          placeholder="2d 23h 35m 10s"
          value={formatTime(seconds)}
        />
        
      </p>
      <div className="timer-buttons">
        <button
          className={"btn " + (running ? "btn-warning" : "btn-success")}
          onClick={runClick}
        >
          {running ? "Pause" : "Run"}
        </button>
        <button className="btn btn-danger" onClick={resetClick}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;