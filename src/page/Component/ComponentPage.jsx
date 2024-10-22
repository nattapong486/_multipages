
import Counter from "./components/Counter/Counter";
import Timer from "./components/Timer/Timer";
import Add from "./components/Add/Add";
import Temperature from "./components/Temperature/Temperature";
// import style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Component.css';


function Component() {

  return (
    <div className="app-container">
      <div className="header">
        <h2>REACT COMPONENTS</h2>
      </div>

      <div className="grid-container">
        <div className="counter">
          <Counter />
        </div>
        <div className="timer">
          <Timer />
        </div>
        <div className="add">
          <Add />
        </div>
        <div className="temperature">
          <Temperature />
        </div>
      </div>

      <div className="footer">
        <p>66078722 ณัฏฐพงษ์ รากแก้ว</p>
      </div>

    </div>
  )
}

export default Component