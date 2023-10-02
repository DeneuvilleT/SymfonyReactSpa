import React from "react";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Products from "./Products/Products";
import Cart from "./Cart/Cart";
import Profile from "./Profile/Profile";
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
