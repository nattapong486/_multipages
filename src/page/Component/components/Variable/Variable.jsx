import "./Variable.css";


function Variable({ name, value, setValue }) {
    return (
      <div className="counter-container">
        <h3 className="counter-title">{name || "Counter"}</h3>
        <button
          className="counter-button counter-dec"
          onClick={() => setValue(value - 1)}
        >
          -
        </button>
        <span className="counter-value">{value}</span>
        <button
          className="counter-button counter-inc"
          onClick={() => setValue(value + 1)}
        >
          +
        </button>
      </div>
    );
  }
  
  
  export default Variable;