import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts } from "./data/products";

import Layout from "./layout/Layout/Layout";

import Home from "./page/Home/Home";
import Todo from "./page/Todo/Todo";
import Calculator from "./page/Calculator/Calculator";
import Component from "./page/Component/ComponentPage";
import Product from "./page/Product/Product";
import Carts from "./page/Carts/Carts";
import Animation from "./page/Animation/Animation";
import Login from "./page/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import "./App.css";

// HashRouter, BrowserRouter, MemoryRouter
// localhost:5173/#/<path>    //HashRouter *compatible
// localhost:5173/<path>      //BrowserRouter
// localhost:5173              //MemoryRouter

const intTab = "home";

function App() {
  const [toKen, setToken] = useState("");
  const [role, setRole] = useState("");

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  useEffect(() => console.log(carts), [carts]);

  if (toKen === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout products={products} carts={carts} setToken={setToken} />
              }
            >
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/calculator"} element={<Calculator />} />
              <Route path={"/Animation"} element={<Animation />} />
              <Route path={"/component"} element={<Component />} />
              <Route path={"/todo"} element={<Todo />} />
              <Route
                path={"/product"}
                element={
                  <Product
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path={"/carts"}
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
