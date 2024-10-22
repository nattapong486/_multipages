import "./Counter.css";

import { useState } from 'react';


function Counter(props) {


    // let value = props.value;
    const [value, setValue] = useState(props.value || 0);

    function increment() {
       setValue(value + 1);
    
    }

    function decrement() {
        setValue(value - 1);
   
    }

    return (
        <div className='counter-container'>
            <h3 className='counter-title'>{props.name || "Counter"}</h3>
            <button className='counter-button counter-dec' onClick={decrement}>-</button>
            <span className='counter-value'>{value}</span>
            <button className='counter-button counter-inc' onClick={increment}>+</button>
        </div>
    ) 
}

export default Counter;