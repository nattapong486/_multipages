import "./Animation.css";



import { useState, useEffect } from 'react';

const Animation = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [running, setRunning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    
    const fieldWidth = 700;
    const fieldHeight = 400;
    const ballSize = 90;
    const vx = 5;
    const vy = 5;
    const maxLeft = fieldWidth - ballSize - 2;
    const maxTop = fieldHeight - ballSize - 2;
  
    const toggleRun = () => setRunning(!running);
  
    const calculatePosition = () => {
      let newX = x;
      let newY = y;
      let hitWall = false;
  
      if (goRight) {
        newX += vx;
        if (newX >= maxLeft) {
          setGoRight(false);
          hitWall = true;
        }
      } else {
        newX -= vx;
        if (newX <= 0) {
          setGoRight(true);
          hitWall = true;
        }
      }
  
      if (goDown) {
        newY += vy;
        if (newY >= maxTop) {
          setGoDown(false);
          hitWall = true;
        }
      } else {
        newY -= vy;
        if (newY <= 0) {
          setGoDown(true);
          hitWall = true;
        }
      }
  
      spinBall(hitWall);
      setX(newX);
      setY(newY);
    };
  
    const spinBall = (hitWall) => {
      setRotation((prevRotation) => prevRotation + (hitWall ? 50 : 5));
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (running) {
          calculatePosition();
        }
      }, 25);
      return () => clearInterval(interval);
    }, [running, x, y, goRight, goDown]);
  
    const changeBallImage = (img) => {
      setImageUrl(img);
    };
  
    return (
      <div id="animation-container">
        <div id="field">
          <div
            id="ball"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              backgroundImage: `url(${imageUrl})`,
              transform: `rotate(${rotation}deg)`,
            }}
          ></div>
        </div>
        <div id="control">
          <button id="run" className="btn btn-primary" onClick={toggleRun}>
            {running ? 'Stop' : 'Run'}
          </button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage('')}>NON</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/basketball.png")}>Basketball</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/football.png")}>Football</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/volleyball.png")}>Volleyball</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/human.png")}>Human</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/catoon.png")}>Cartoon</button>
          <button className="btn btn-outline-secondary" onClick={() => changeBallImage("/src/img/logo.png")}>Logo</button>
        </div>
      </div>
    );
  };

export default Animation;