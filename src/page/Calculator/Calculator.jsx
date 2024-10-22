import React, { useState } from 'react';

import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("");
  const [runningTotal, setRunningTotal] = useState(0);
  const [lastOperator, setLastOperator] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const addClick = (input) => {
    if (resetDisplay) {
      setDisplay(input);
      setResetDisplay(false);
    } else {
      setDisplay(display + input);
    }
  };

  const clearDisplay = () => {
    setDisplay("");
    setRunningTotal(0);
    setLastOperator(null);
  };

  const operatorClick = (operator) => {
    setRunningTotal(parseFloat(display));
    setLastOperator(operator);
    setDisplay("");
  };

  const calculate = () => {
    const currentValue = parseFloat(display);

    if (lastOperator === null) return;

    switch (lastOperator) {
      case '+':
        setDisplay(runningTotal + currentValue);
        break;
      case '-':
        setDisplay(runningTotal - currentValue);
        break;
      case '*':
        setDisplay(runningTotal * currentValue);
        break;
      case '/':
        setDisplay(runningTotal / currentValue);
        break;
      default:
        break;
    }
    setRunningTotal(0);
    setLastOperator(null);
    setResetDisplay(true);
  };

  return (
    <div className="calculator-container">
    <div className="wrapper">
      <div className="screen-con">
        <input type="text" id="screen" value={display} disabled />
      </div>
      <section className="cals-btt">
        <div className="btt-row">
          <button className="btt-clear" onClick={clearDisplay}>AC</button>
          <button className="btt-none">+/-</button>
          <button className="btt-none">%</button>
          <button className="btt-operator" onClick={() => operatorClick('/')}>÷</button>
        </div>
        <div className="btt-row">
          <button className="btt-number" onClick={() => addClick('7')}>7</button>
          <button className="btt-number" onClick={() => addClick('8')}>8</button>
          <button className="btt-number" onClick={() => addClick('9')}>9</button>
          <button className="btt-operator" onClick={() => operatorClick('*')}>x</button>
        </div>
        <div className="btt-row">
          <button className="btt-number" onClick={() => addClick('4')}>4</button>
          <button className="btt-number" onClick={() => addClick('5')}>5</button>
          <button className="btt-number" onClick={() => addClick('6')}>6</button>
          <button className="btt-operator" onClick={() => operatorClick('-')}>-</button>
        </div>
        <div className="btt-row">
          <button className="btt-number" onClick={() => addClick('1')}>1</button>
          <button className="btt-number" onClick={() => addClick('2')}>2</button>
          <button className="btt-number" onClick={() => addClick('3')}>3</button>
          <button className="btt-operator" onClick={() => operatorClick('+')}>+</button>
        </div>
        <div className="btt-row">
          <button className="btt-zero" onClick={() => addClick('0')}>0</button>
          <button className="btt-dot" onClick={() => addClick('.')}>.</button>
          <button className="btt-equal" onClick={calculate}>=</button>
        </div>
      </section>
    </div>
    </div>
  );
}

export default Calculator;
