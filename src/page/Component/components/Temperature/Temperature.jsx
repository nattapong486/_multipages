import "./Temperature.css";

import Variable from "../Variable/Variable";
import { useState } from "react";

function Temperature() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);
  const [kelvin, setKelvin] = useState(273.15);

  // Single function to handle all conversions
  const handleTemperatureChange = (value, scale) => {
    const temp = parseFloat(value);

    if (scale === "Celsius") {
      setCelsius(temp);
      setFahrenheit((temp * 9) / 5 + 32);
      setKelvin(temp + 273.15);
    } else if (scale === "Fahrenheit") {
      const celsiusTemp = ((temp - 32) * 5) / 9;
      setCelsius(celsiusTemp);
      setFahrenheit(temp);
      setKelvin(celsiusTemp + 273.15);
    } else if (scale === "Kelvin") {
      const celsiusTemp = temp - 273.15;
      setCelsius(celsiusTemp);
      setFahrenheit((celsiusTemp * 9) / 5 + 32);
      setKelvin(temp);
    }
  };

  return (
    <div className="tem-container">
      <h3 className="tem-title">Temperature Converter</h3>
      <h2 className="tem-display">
        <span className="badge bg-primary">{celsius.toFixed(2)} °C</span>
        <span className="badge bg-primary">{fahrenheit.toFixed(2)} °F</span>
        <span className="badge bg-primary">{kelvin.toFixed(2)} °K</span>
      </h2>
      <div className="tem-variables">
        <Variable
          name="Celsius"
          type="int"
          value={celsius}
          setValue={(value) => handleTemperatureChange(value, "Celsius")}
        />
        <Variable
          name="Fahrenheit"
          value={fahrenheit}
          setValue={(value) => handleTemperatureChange(value, "Fahrenheit")}
        />
        <Variable
          name="Kelvin"
          value={kelvin}
          setValue={(value) => handleTemperatureChange(value, "Kelvin")}
        />
      </div>
    </div>
  );
}

export default Temperature;