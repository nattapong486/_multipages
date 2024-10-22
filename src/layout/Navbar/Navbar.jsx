import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ tab, setTab, products, carts, setToken }) {
  return (
    <div className="navbar-container">
      <Link to="/">
        <button
          className={
            "btn " + (tab === "home" ? " btn-primary " : " btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to="/calculator">
        <button
          className={
            "btn " +
            (tab === "calculator" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>

      <Link to="/animation">
        <button
          className={
            "btn " +
            (tab === "animation" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>

      <Link to="/component">
        <button
          className={
            "btn " +
            (tab === "component" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("component")}
        >
          Component
        </button>
      </Link>

      <Link to="/todo">
        <button
          className={
            "btn " + (tab === "todo" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("todo")}
        >
          Todo
        </button>
      </Link>

      <Link to="/product">
        <button
          className={
            "btn " +
            (tab === "products" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("products")}
        >
          Products ({products ? products.length : 0})
        </button>
      </Link>

      <Link to="/carts">
        <button
          className={
            "position-relative btn " +
            (tab === "carts" ? " btn-primary" : " btn-outline-primary")
          }
          onClick={() => setTab("carts")}
        >
          Carts
          {carts && carts.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : "9+"}
              <span className="visually-hidden">messages</span>
            </span>
          )}
        </button>
      </Link>

      <button
        className={
          "btn " + (tab === "logout" ? " btn-danger" : " btn-outline-danger")
        }
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;