import React from "react";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import Products from "./containers/Products/Products";
import Cart from "./containers/Cart/Cart";
import Profile from "./containers/Profile/Profile";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
